import React, { useContext, useState, useEffect, useRef } from 'react'
import { CircleUserRound, Forward, Group, UserRoundPlus, X } from 'lucide-react';
import { UserContext } from '../context/user.context'
import { useLocation } from 'react-router-dom';
import axios from '../config/axios';
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket'
import Markdown from 'markdown-to-jsx'
import hljs from 'highlight.js';
import { getWebContainer } from '../config/webContainers'
import toast from 'react-hot-toast';
function SyntaxHighlightedCode(props) {
  const ref = useRef(null)

  React.useEffect(() => {
    if (ref.current && props.className?.includes('lang-') && window.hljs) {
      window.hljs.highlightElement(ref.current)

      // hljs won't reprocess the element unless this attribute is removed
      ref.current.removeAttribute('data-highlighted')
    }
  }, [props.className, props.children])

  return <code {...props} ref={ref} />
}

const Project = () => {
  const location = useLocation()
  console.log(location.state)

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(new Set()) // Initialized as Set
  const [project, setProject] = useState(location.state.project)
  const [clickedOnce, setClickedOnce] = useState(false);
  const [message, setMessage] = useState('')
  const { user } = useContext(UserContext)
  const messageBox = React.createRef()

  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([]) // New state variable for messages
  const [fileTree, setFileTree] = useState({})

  const [currentFile, setCurrentFile] = useState(null)
  const [openFiles, setOpenFiles] = useState([])

  const [webContainer, setWebContainer] = useState(null)
  const [iframeUrl, setIframeUrl] = useState(null)

  const [runProcess, setRunProcess] = useState(null)

  const handleUserClick = (id) => {
    setSelectedUserId(prevSelectedUserId => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }
      return newSelectedUserId;
    });
  }
  function addCollaborators() {
    axios.put("/projects/add-user", {
      projectId: location.state.project._id,
      users: Array.from(selectedUserId)
    }).then(res => {
      console.log(res.data)
      toast.success("Collaborators added successfully")
      setIsModalOpen(false)
    }).catch(err => {
      toast.error("Error adding collaborators")
      console.log(err)
    })
  }
  const send = () => {
    sendMessage('project-message', {
      message,
      sender: user
    })
    setMessages(prevMessages => [...prevMessages, { sender: user, message }]) // Update messages state
    setMessage("")
    scrollToBottom();
  }

  function WriteAiMessage(message) {
    const messageObject = JSON.parse(message)
    return (
      <div
        className='overflow-auto bg-slate-950 text-white rounded-sm p-2'
      >
        <Markdown
          children={messageObject.text}
          options={{
            overrides: {
              code: SyntaxHighlightedCode,
            },
          }}
        />
      </div>)
  }

  useEffect(() => {
    initializeSocket(project._id)
    if (!webContainer) {
      getWebContainer().then(container => {
        setWebContainer(container)
        console.log("container started")
      })
    }
    receiveMessage('project-message', data => {
      console.log(data)
      if (data.sender._id == 'ai') {
        const message = JSON.parse(data.message)
        console.log(message)
        webContainer?.mount(message.fileTree)
        if (message.fileTree) {
          setFileTree(message.fileTree || {})
        }
        setMessages(prevMessages => [...prevMessages, data]) // Update messages state
        scrollToBottom();
      } else {
        setMessages(prevMessages => [...prevMessages, data]) // Update messages state
      }
    })
    axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {
      console.log(res.data.project)
      setProject(res.data.project)
      setFileTree(res.data.project.fileTree || {})
    })
    axios.get('/users/all').then(res => {
      setUsers(res.data.users)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  function saveFileTree(ft) {
    axios.put('/projects/update-file-tree', {
      projectId: project._id,
      fileTree: ft
    }).then(res => {
      console.log(res.data)

    }).catch(err => {
      console.log(err)
    })
  }

  function scrollToBottom() {
    if (messageBox.current) messageBox.current.scrollTop = messageBox.current.scrollHeight
  }

  return (
    <main className='h-screen w-screen flex'>
      <section className='left relative flex flex-col h-full min-w-96 bg-zinc-950'>

        <header className='flex justify-between p-2 px-3 w-full bg-zinc-800'>
          <div className='flex gap-1 items-center'>
            <button onClick={() => setIsModalOpen(true)} className='p-2 rounded-md hover:bg-zinc-900 cursor-pointer'>
              <UserRoundPlus className='text-white' size={20} />
            </button>
            <span className='text-xs tracking-tighter font-medium text-zinc-400'>Add collaborators</span>
          </div>
          <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2 rounded-md hover:bg-zinc-900 cursor-pointer'>
            <Group className='text-white' />
          </button>
        </header>

        <div className='conversation-area flex-grow flex flex-col'>

          <div
            ref={messageBox}
            className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-[calc(100vh-108px)] scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {messages.map((msg, index) => (
              <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-52'} ${msg.sender._id == user._id.toString() && 'ml-auto'}  message flex flex-col p-2 bg-zinc-700 text-white w-fit rounded-md`}>
                <small className='opacity-65 text-xs text-zinc-100'>{msg.sender.email}</small>
                <div className='text-sm'>
                  {msg.sender._id === 'ai' ?
                    WriteAiMessage(msg.message)
                    : <p>{msg.message}</p>}
                </div>
              </div>
            ))}
          </div>


          <div className='inputField text-white flex gap-1 justify-between p-2 bg-zinc-800'>
            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Enter message' className='text-white w-full p-2 bg-zinc-900 rounded-md text-sm outline-none' />
            <button onClick={send} className='px-2 py-1 rounded-md hover:bg-zinc-900 cursor-pointer'><Forward /></button>
          </div>
        </div>

        <div className={`sidePanel flex flex-col gap-2 w-full h-full bg-zinc-900 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>

          <header className='flex justify-between items-center p-2 px-3 w-full bg-zinc-800'>
            <span className='text-sm tracking-tighter font-medium text-zinc-400'>Collaborators</span>
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2 rounded-md hover:bg-zinc-900 cursor-pointer'>
              <X className='text-white' />
            </button>
          </header>

          <div className="users cursor-pointer flex flex-col gap-2 p-2">
            <div className="user flex flex-col gap-2 items-center">

              {project.users && project.users.map(user => {
                return (
                  <div className="user cursor-pointer rounded-md w-full hover:bg-zinc-800 p-2 flex gap-2 items-center">
                    <div className='aspect-square rounded-full w-fit h-fit p-2 bg-zinc-950'>
                      <CircleUserRound className='text-white' />
                    </div>
                    <h1 className='text-white font-semibold text-lg'>{user.email}</h1>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
      </section>

      <section className="right  bg-zinc-800 flex-grow h-full flex">
        <div className="explorer h-full max-w-64 min-w-52 bg-zinc-900">
          <div className="file-tree w-full">
            {
              Object.keys(fileTree).map((file, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentFile(file)
                    setOpenFiles([...new Set([...openFiles, file])])
                  }}
                  className="tree-element cursor-pointer p-2 px-4 flex items-center gap-2 bg-zinc-50 text-black w-full hover:bg-zinc-900 hover:text-white">
                  <p
                    className='font-semibold text-base'
                  >{file}</p>
                </button>))
            }
          </div>

        </div>

        <div className="code-editor flex flex-col flex-grow h-full shrink">
          <div className="top flex justify-between w-full bg-black">
            <div className="files flex">
              {
                openFiles.map((file, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFile(file)}
                    className={`open-file cursor-pointer p-2 px-4 flex items-center w-fit gap-2 bg-zinc-800 border border-zinc-700 text-white ${currentFile === file ? 'bg-zinc-900' : ''}`}>
                    <p
                      className='font-semibold text-base'
                    >{file}</p>
                  </button>
                ))
              }
            </div>

            <div className="actions flex gap-2">
              {/* <button className='px-3 p-1 bg-white cursor-pointer'>run</button> */}



              <button
                onClick={async () => {
                  if (!clickedOnce) {
                    setClickedOnce(true);
                    toast.success("Double-click to confirm running the file", { autoClose: 2000 });
                    setTimeout(() => setClickedOnce(false), 2000); // Reset after 2 seconds
                    return;
                  }

                  await webContainer.mount(fileTree);

                  const installProcess = await webContainer.spawn("npm", ["install"]);
                  installProcess.output.pipeTo(
                    new WritableStream({
                      write(chunk) {
                        console.log(chunk);
                      },
                    })
                  );

                  if (runProcess) {
                    runProcess.kill();
                  }

                  let tempRunProcess = await webContainer.spawn("npm", ["start"]);
                  tempRunProcess.output.pipeTo(
                    new WritableStream({
                      write(chunk) {
                        console.log(chunk);
                      },
                    })
                  );

                  setRunProcess(tempRunProcess);
                  webContainer.on("server-ready", (port, url) => {
                    console.log(port, url);
                    setIframeUrl(url);
                  });

                  setClickedOnce(false); // Reset after running
                }}
                className="p-2 px-4 bg-white text-black cursor-pointer font-semibold"
              >
                Run
              </button>


            </div>
          </div>
          <div className="bottom flex flex-grow max-w-full shrink overflow-auto">
            {
              fileTree[currentFile] && (
                <div className="code-editor-area h-full overflow-auto flex-grow text-white">
                  <pre
                    className="hljs h-full">
                    <code
                      className="hljs h-full outline-none"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const updatedContent = e.target.innerText;
                        const ft = {
                          ...fileTree,
                          [currentFile]: {
                            file: {
                              contents: updatedContent
                            }
                          }
                        }
                        setFileTree(ft)
                        saveFileTree(ft)
                      }}
                      dangerouslySetInnerHTML={{ __html: hljs.highlight('javascript', fileTree[currentFile].file.contents).value }}
                      style={{
                        whiteSpace: 'pre-wrap',
                        paddingBottom: '25rem',
                        counterSet: 'line-numbering',
                      }}
                    />
                  </pre>
                </div>
              )
            }
          </div>

        </div>

        {iframeUrl && webContainer &&
          (<div className="flex min-w-96 flex-col h-full">
            <div className="address-bar">
              <input type="text"
                onChange={(e) => setIframeUrl(e.target.value)}
                value={iframeUrl} className="w-full p-2 px-4 bg-slate-200 mx-auto" />
            </div>
            <iframe src={iframeUrl} className="w-full h-full bg-white"></iframe>
          </div>)
        }
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-zinc-950 text-white p-4 rounded-md w-80 max-w-full relative shadow-lg">
            <header className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold'>Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className='p-2 cursor-pointer'>
                <X className='text-white' size={16} />
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-12 max-h-80 overflow-auto">
              {users.map(user => (
                <div key={user.id} className={`user cursor-pointer hover:bg-zinc-800 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-zinc-800' : ""} p-2 flex gap-2 items-center rounded-md`} onClick={() => handleUserClick(user._id)}>
                  <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-1 text-white bg-zinc-800'>
                    <CircleUserRound />
                  </div>
                  <h1 className='font-semibold text-md text-white'>{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              onClick={addCollaborators}
              className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white text-black rounded-md text-sm font-semibold tracking-tighter cursor-pointer'>
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default Project