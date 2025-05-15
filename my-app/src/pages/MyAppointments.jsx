"use client"

import { useState, useEffect, useRef } from "react"
import { useNotifications } from "../components/NotificationsContext"
import {
  ListChecks,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
  Phone,
  PhoneIncoming,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  ScreenShare,
  ScreenShareOff,
} from "lucide-react"

function MyAppointments({ onClose }) {
  const { addNotification } = useNotifications()
  console.log("Rendering MyAppointments component")

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      with: "Dr. Emily Carter (Career Advisor)",
      dateTime: "2024-09-10 at 10:00 AM",
      status: "Confirmed",
      isUserOnline: true,
      callState: null,
    },
    {
      id: 2,
      with: "John Doe (Student Advisor)",
      dateTime: "2024-09-12 at 02:30 PM",
      status: "Pending SCAD Officer Acceptance",
      isUserOnline: false,
      callState: null,
    },
    {
      id: 3,
      with: "Student Jane Smith",
      dateTime: "2024-09-15 at 11:00 AM",
      status: "Awaiting Your Response",
      isUserOnline: true,
      callState: null,
    },
  ])

  const [callControls, setCallControls] = useState({
    videoEnabled: true,
    micMuted: false,
    screenShared: false,
  })

  const [activeCallId, setActiveCallId] = useState(null)
  const [callTimer, setCallTimer] = useState(0)

  const timerRefsRef = useRef({})
  const callStartedRef = useRef(false)
  const intervalRef = useRef(null)
  // Add a ref to track if toast has been shown
  const toastShownRef = useRef(false)

  const activeCall = activeCallId ? appointments.find((app) => app.id === activeCallId) : null

  useEffect(() => {
    console.log("Active call ID changed:", activeCallId)
    if (activeCallId) {
      console.log("Active call object:", activeCall)
    }
  }, [activeCallId, activeCall]) // Added activeCall to dependencies for completeness

  useEffect(() => {
    console.log("Setting up incoming call simulation timer")
    const timer = setTimeout(() => {
      // Only show toast if no call has been started AND toast hasn't been shown yet
      if (!callStartedRef.current && !toastShownRef.current && !activeCallId) {
        console.log("Checking for confirmed appointments to simulate call")
        const confirmedApp = appointments.find((app) => app.status === "Confirmed" && app.isUserOnline)
        if (confirmedApp) {
          console.log("Found confirmed appointment, showing toast:", confirmedApp.id)
          // Mark toast as shown
          toastShownRef.current = true
          showIncomingCallToast(confirmedApp)
        } else {
          console.log("No confirmed and online appointment found for simulated call.")
        }
      } else {
        console.log("Call already started by user or toast already shown, skipping simulated incoming call toast")
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [appointments]) // Added appointments dependency in case it changes

  useEffect(() => {
    console.log("Call timer effect triggered. Current activeCallId:", activeCallId)

    if (activeCallId) {
      console.log("Starting call timer for activeCallId:", activeCallId)
      intervalRef.current = setInterval(() => {
        setCallTimer((prev) => prev + 1)
      }, 1000)

      timerRefsRef.current.autoEndCall = setTimeout(() => {
        console.log("Auto-ending call after 15 seconds for activeCallId:", activeCallId)
        // Ensure we're leaving the *correct* active call
        if (activeCallId) handleLeaveCall(activeCallId)
      }, 15000)
    } else {
      console.log("Clearing call timer because activeCallId is null.")
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setCallTimer(0)
      if (timerRefsRef.current.autoEndCall) {
        clearTimeout(timerRefsRef.current.autoEndCall)
        delete timerRefsRef.current.autoEndCall
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timerRefsRef.current.autoEndCall) {
        clearTimeout(timerRefsRef.current.autoEndCall)
      }
    }
  }, [activeCallId]) // Dependency is correct

  const showIncomingCallToast = (appointment) => {
    console.log("Showing incoming call toast for:", appointment.id)
    // Ensure addNotification exists before calling
    if (addNotification) {
      addNotification(`Incoming call from ${appointment.with}`, "call")
    } else {
      console.warn("addNotification function is not provided!")
    }

    const toastId = `toast-${appointment.id}`
    // Remove existing toast for this ID if any
    removeToast(appointment.id)

    const toast = document.createElement("div")
    toast.id = toastId
    toast.className = "incoming-call-toast"
    // ... (innerHTML remains the same)
    toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><path d="M14.05 2a9 9 0 0 1 8 7.94"></path><path d="M14.05 6A5 5 0 0 1 18 10"></path></svg></div>
      <div class="toast-message">
        <p>Incoming call from ${appointment.with}</p>
      </div>
      <div class="toast-actions">
        <button class="accept-btn">Accept</button>
        <button class="reject-btn">Reject</button>
      </div>
    </div>
  `
    document.body.appendChild(toast)

    const acceptBtn = toast.querySelector(".accept-btn")
    const rejectBtn = toast.querySelector(".reject-btn")

    const onAccept = () => {
      console.log("Toast: Accept button clicked for ID:", appointment.id)
      removeToast(appointment.id)
      handleAcceptCall(appointment.id)
      clearTimeout(autoRejectTimer) // Clear auto-reject timer
    }
    const onReject = () => {
      console.log("Toast: Reject button clicked for ID:", appointment.id)
      removeToast(appointment.id)
      handleRejectCall(appointment.id)
      clearTimeout(autoRejectTimer) // Clear auto-reject timer
    }

    acceptBtn.addEventListener("click", onAccept)
    rejectBtn.addEventListener("click", onReject)

    setAppointments((prev) => prev.map((app) => (app.id === appointment.id ? { ...app, callState: "incoming" } : app)))

    const autoRejectTimer = setTimeout(() => {
      console.log("Toast: Auto-rejecting call due to timeout for ID:", appointment.id)
      removeToast(appointment.id) // Ensure toast is removed
      // Check if call is still incoming before auto-rejecting
      const currentAppointmentState = appointments.find((app) => app.id === appointment.id)
      if (currentAppointmentState && currentAppointmentState.callState === "incoming") {
        handleRejectCall(appointment.id)
      }
    }, 30000)
  }

  const removeToast = (id) => {
    const toastId = `toast-${id}`
    console.log("Attempting to remove toast with ID:", toastId)
    const toast = document.getElementById(toastId)
    if (toast && toast.parentNode === document.body) {
      document.body.removeChild(toast)
      console.log("Toast removed:", toastId)
    } else {
      console.log("Toast not found or not child of body:", toastId)
    }
  }

  const handleAcceptAppointment = (id) => {
    console.log("Accepting appointment:", id)
    const appointment = appointments.find((app) => app.id === id)
    if (!appointment) return console.error("Appointment not found for accept:", id)

    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Confirmed", callState: null } : app)),
    )
    if (addNotification) addNotification(`You accepted appointment with ${appointment.with}`, "success")
    setTimeout(() => {
      if (addNotification) addNotification(`${appointment.with} was notified of your acceptance`, "info")
    }, 1000)
  }

  const handleRejectAppointment = (id) => {
    console.log("Rejecting appointment:", id)
    const appointment = appointments.find((app) => app.id === id)
    if (!appointment) return console.error("Appointment not found for reject:", id)

    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Rejected by You", callState: null } : app)),
    )
    if (addNotification) addNotification(`You rejected appointment with ${appointment.with}`, "error")
    setTimeout(() => {
      if (addNotification) addNotification(`${appointment.with} was notified of your rejection`, "info")
    }, 1000)
  }

  const handleAcceptCall = (id) => {
    console.log("Attempting to accept call for ID:", id)
    const appointment = appointments.find((app) => app.id === id)
    if (!appointment) return console.error("Appointment not found for accept call:", id)

    // Clear any other active calls first (optional, depends on desired behavior)
    // setActiveCallId(null); // If you want to ensure only one call can be active

    setAppointments((prev) =>
      prev.map(
        (app) =>
          app.id === id
            ? { ...app, callState: "active" }
            : { ...app, callState: app.callState === "active" ? null : app.callState }, // End other active calls
      ),
    )
    setCallControls({ videoEnabled: true, micMuted: false, screenShared: false })
    removeToast(id)
    if (addNotification) addNotification(`Call started with ${appointment.with}`, "call")

    setActiveCallId(id) // This is the crucial line!
    setCallTimer(0)
    console.log("Call accepted. activeCallId IS NOW SET TO:", id)
  }

  const handleRejectCall = (id) => {
    console.log("Rejecting call for ID:", id)
    const appointment = appointments.find((app) => app.id === id)
    if (!appointment) return console.error("Appointment not found for reject call:", id)

    setAppointments((prev) => prev.map((app) => (app.id === id ? { ...app, callState: null } : app)))
    removeToast(id)
    if (addNotification) addNotification(`You rejected call from ${appointment.with}`, "call")
    // If this was the active call, ensure it's cleared
    if (activeCallId === id) {
      setActiveCallId(null)
    }
  }

  const handleStartCall = (id) => {
    console.log("Attempting to start call for ID:", id)
    const appointment = appointments.find((app) => app.id === id)
    if (!appointment) return console.error("Appointment not found for start call:", id)

    callStartedRef.current = true
    setAppointments((prev) => prev.map((app) => (app.id === id ? { ...app, callState: "connecting" } : app)))
    if (addNotification) addNotification(`Connecting to ${appointment.with}...`, "call")

    // Clear previous connecting timer if any for this ID
    if (timerRefsRef.current[`connecting_${id}`]) clearTimeout(timerRefsRef.current[`connecting_${id}`])

    timerRefsRef.current[`connecting_${id}`] = setTimeout(() => {
      console.log("Connection delay finished, activating call for ID:", id)
      setAppointments((prev) =>
        prev.map(
          (app) =>
            app.id === id
              ? { ...app, callState: "active" }
              : { ...app, callState: app.callState === "active" ? null : app.callState }, // End other active calls
        ),
      )
      setCallControls({ videoEnabled: true, micMuted: false, screenShared: false })

      setActiveCallId(id) // This is the crucial line!
      setCallTimer(0)
      console.log("Call started. activeCallId IS NOW SET TO:", id)
      delete timerRefsRef.current[`connecting_${id}`]
    }, 3000)
  }

  const handleLeaveCall = (id) => {
    console.log("Leaving call for ID:", id)
    const appointment = appointments.find((app) => app.id === id)
    if (!appointment) {
      // If appointment not found, but this was the active call ID, still clear it
      if (activeCallId === id) setActiveCallId(null)
      return console.warn("Appointment not found for leave call:", id)
    }

    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, callState: null, isUserOnline: false } : app)),
    )
    if (addNotification) addNotification(`You left the call with ${appointment.with}`, "call")

    if (activeCallId === id) {
      setActiveCallId(null) // This is crucial
      console.log("Active call ID cleared due to leaving call.")
    }

    if (timerRefsRef.current[`leave_${id}`]) clearTimeout(timerRefsRef.current[`leave_${id}`])
    timerRefsRef.current[`leave_${id}`] = setTimeout(() => {
      if (addNotification) addNotification(`Call with ${appointment.with} ended 10 seconds ago`, "info")
      delete timerRefsRef.current[`leave_${id}`]
    }, 10000)
  }

  const handleSimulateOtherUserLeft = (id) => {
    console.log("Simulating other user left call:", id)
    const appointment = appointments.find((app) => app.id === id)
    if (!appointment) {
      if (activeCallId === id) setActiveCallId(null)
      return console.warn("Appointment not found for simulate other user left:", id)
    }

    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, callState: null, isUserOnline: false } : app)),
    )
    if (addNotification) addNotification(`${appointment.with} has left the call`, "call")
    if (activeCallId === id) {
      setActiveCallId(null)
      console.log("Active call ID cleared due to other user leaving.")
    }

    if (timerRefsRef.current[`leave_${id}`]) {
      clearTimeout(timerRefsRef.current[`leave_${id}`])
    }
    timerRefsRef.current[`leave_${id}`] = setTimeout(() => {
      if (addNotification) addNotification(`Call with ${appointment.with} ended 10 seconds ago`, "info")
      delete timerRefsRef.current[`leave_${id}`]
    }, 10000)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const toggleVideo = () => {
    setCallControls((prev) => ({ ...prev, videoEnabled: !prev.videoEnabled }))
  }

  const toggleMic = () => {
    setCallControls((prev) => ({ ...prev, micMuted: !prev.micMuted }))
  }

  const toggleScreenShare = () => {
    setCallControls((prev) => ({ ...prev, screenShared: !prev.screenShared }))
  }

  useEffect(() => {
    return () => {
      console.log("MyAppointments unmounting. Cleaning up all timers.")
      Object.values(timerRefsRef.current).forEach((timerId) => {
        if (timerId) clearTimeout(timerId)
      })
      timerRefsRef.current = {} // Clear the refs
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  const CallModal = () => {
    // Critical log: Does this component even get this far when activeCallId is set?
    console.log("CallModal: Evaluating. activeCallId is:", activeCallId)

    if (!activeCallId) {
      // console.log("CallModal: activeCallId is falsy, returning null.") // Can be verbose
      return null
    }

    // If activeCallId is truthy, we should reach here.
    // The `activeCall` variable is derived outside and available here.
    console.log("CallModal: Rendering modal. activeCallId:", activeCallId, "activeCall:", activeCall)
    if (!activeCall) {
      console.error(
        "CallModal: activeCallId is set, but activeCall object is null/undefined. This might indicate an issue with finding the appointment. activeCallId:",
        activeCallId,
      )
      // You might want to handle this gracefully, e.g., show an error or close the modal
      // For now, let it proceed but log error. It will show "Call with undefined".
    }

    return (
      <div className="call-modal-overlay">
        <div className="call-modal-content">
          <div className="call-header">
            <h3>Call with {activeCall?.with || "Unknown Contact"}</h3>
            <div className="call-timer">{formatTime(callTimer)}</div>
            <button className="end-call-btn" onClick={() => handleLeaveCall(activeCallId)}>
              <PhoneOff size={16} /> End Call
            </button>
          </div>
          <div className="call-video">
            <p>Video feed would appear here</p>
            {/* Simulate other user leaving */}
          </div>
          <div className="call-controls">
            <button className={`control-btn ${!callControls.videoEnabled ? "disabled" : ""}`} onClick={toggleVideo}>
              {callControls.videoEnabled ? (
                <>
                  <Video size={16} /> Video ON
                </>
              ) : (
                <>
                  <VideoOff size={16} /> Video OFF
                </>
              )}
            </button>
            <button className={`control-btn ${callControls.micMuted ? "disabled" : ""}`} onClick={toggleMic}>
              {callControls.micMuted ? (
                <>
                  <MicOff size={16} /> Mic OFF
                </>
              ) : (
                <>
                  <Mic size={16} /> Mic ON
                </>
              )}
            </button>
            <button className={`control-btn ${callControls.screenShared ? "active" : ""}`} onClick={toggleScreenShare}>
              {callControls.screenShared ? (
                <>
                  <ScreenShareOff size={16} /> Stop Share
                </>
              ) : (
                <>
                  <ScreenShare size={16} /> Share Screen
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="appointments-section">
      <div className="appointments-header">
        <h2>
          <ListChecks size={22} style={{ marginRight: "10px" }} />
          My Appointments
        </h2>
        {onClose && (
          <button className="modal-close-button" onClick={onClose}>
            <span>×</span>
          </button>
        )}
      </div>
      <CallModal /> {/* The CallModal is rendered here */}
      <div className="appointments-list">
        {/* ... (rest of your JSX, map function etc.) ... */}
        {appointments.map((app) => (
          <div key={app.id} className="appointment-entry">
            <div className="appointment-info">
              <h4>{app.with}</h4>
              <p>Date: {app.dateTime}</p>
              <p>
                Status: {app.status}
                {app.isUserOnline ? (
                  <span className="online-indicator">
                    {" "}
                    <UserCheck size={14} /> (Online)
                  </span>
                ) : (
                  <span className="offline-indicator">
                    {" "}
                    <UserX size={14} /> (Offline)
                  </span>
                )}
              </p>
            </div>

            {app.status === "Awaiting Your Response" && app.callState !== "active" && app.callState !== "incoming" && (
              <div className="appointment-actions">
                <button onClick={() => handleAcceptAppointment(app.id)} className="action-btn accept">
                  <CheckCircle size={14} /> Accept Appointment
                </button>
                <button onClick={() => handleRejectAppointment(app.id)} className="action-btn reject">
                  <XCircle size={14} /> Reject Appointment
                </button>
              </div>
            )}

            {app.status === "Confirmed" && app.callState === null && (
              <div className="appointment-actions">
                <button onClick={() => handleStartCall(app.id)} className="action-btn primary">
                  <Phone size={14} /> Start Call
                </button>
              </div>
            )}
            {app.status === "Pending SCAD Officer Acceptance" && app.callState === null && (
              <p className="pending-info">
                <em>Waiting for SCAD Officer to confirm. You'll be notified.</em>
              </p>
            )}

            {app.callState === "connecting" && (
              <div className="connecting-call-info">
                <p className="connecting-message">
                  <span className="connecting-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </span>
                  Establishing secure connection with {app.with}...
                </p>
                <div className="connecting-loader">
                  <div className="connecting-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            {app.callState === "incoming" && (
              <div className="incoming-call-info">
                <p>
                  <PhoneIncoming size={18} style={{ color: "#28a745", marginRight: "8px" }} /> Incoming call from{" "}
                  {app.with}...
                </p>
                <div className="appointment-actions">
                  <button onClick={() => handleAcceptCall(app.id)} className="call-action-btn accept-call">
                    <Phone size={14} /> Accept Call
                  </button>
                  <button onClick={() => handleRejectCall(app.id)} className="call-action-btn reject-call">
                    <PhoneOff size={14} /> Reject Call
                  </button>
                </div>
              </div>
            )}

            {app.callState === "active" && (
              <div className="call-controls-container">
                <p className="in-call-status">
                  <strong>In Call with {app.with}</strong> (Open modal for full controls)
                </p>
                <div className="call-actions-footer">
                  <button onClick={() => handleLeaveCall(app.id)} className="control-btn leave">
                    <PhoneOff size={16} /> End Call from List
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {appointments.length === 0 && <p>You have no upcoming appointments.</p>}
      </div>
      <style jsx global>{`
        /* ... (Your CSS styles remain the same) ... */
        .incoming-call-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #000; /* Darker for better visibility */
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 10000; /* Higher than modal if it ever overlaps, though ideally they don't */
          max-width: 350px;
          animation: slideIn 0.3s ease-out;
          display: flex; /* For alignment */
          align-items: center; /* For alignment */
          gap: 10px; /* For spacing elements */
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .toast-content { /* Simplified, assuming direct children structure now */
          display: flex;
          flex-direction: column;
          gap: 8px; /* Space between message and buttons */
          flex-grow: 1; /* Allow text to take space */
        }
        
        .toast-icon {
          color: #4CAF50;
          flex-shrink: 0; /* Prevent icon from shrinking */
        }
        
        .toast-message {
          margin: 0;
          font-size: 0.95rem;
        }
        .toast-message p { margin: 0; }
        
        .toast-actions {
          display: flex;
          gap: 10px;
          margin-top: 8px;
        }
        
        .toast-actions button {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .accept-btn {
          background-color: #4CAF50;
          color: white;
        }
        .accept-btn:hover { background-color: #45a049; }
        
        .reject-btn {
          background-color: #f44336;
          color: white;
        }
        .reject-btn:hover { background-color: #da190b; }

        /* Embedded Call Interface (if you use one in list - otherwise these are for modal) */
        .embedded-call-interface {
          background-color: #f8f9fa;
          border: 2px solid #4CAF50; /* Green border for active call indication */
          border-radius: 8px;
          margin-bottom: 20px; /* Spacing */
          padding: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          position: relative; /* For potential absolute positioned elements inside */
          z-index: 100; /* Above normal content flow */
        }
        
        .call-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .call-header h3 {
          margin: 0;
          font-size: 1.2rem; /* Slightly larger */
          color: #333;
        }
        
        .call-timer {
          font-size: 0.9rem;
          color: #6c757d;
          font-weight: 500;
          background-color: #e9ecef;
          padding: 3px 8px;
          border-radius: 4px;
        }
        
        .end-call-btn {
          display: flex;
          align-items: center;
          gap: 5px; /* Space between icon and text */
          padding: 8px 12px; /* More padding */
          background-color: #fa5252; /* Red for danger/end */
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .end-call-btn:hover {
          background-color: #e03131; /* Darker red on hover */
        }
        
        .call-video {
          background-color: #222; /* Darker background for video area */
          height: 200px; /* Default height, adjust as needed */
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ccc; /* Light grey text on dark background */
          margin-bottom: 15px;
          position: relative; /* For absolutely positioned elements like simulate button */
        }
        
        .call-controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 15px;
          flex-wrap: wrap; /* Allow controls to wrap on smaller screens */
        }
        
        .control-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 16px;
          border-radius: 4px;
          border: 1px solid #ced4da; /* Subtle border */
          background-color: #f1f3f5; /* Light grey background */
          color: #333; /* Darker text for better contrast */
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s ease; /* Smooth transition */
        }
        
        .control-btn:hover {
          background-color: #e9ecef; /* Slightly darker on hover */
        }
        
        .control-btn.disabled { /* When a feature is OFF */
          background-color: #f8f9fa;
          color: #868e96; /* Greyed out text */
          /* icon color can be handled by SVG's 'currentColor' or specific styling */
        }
        
        .control-btn.active { /* When a feature is ON, like screen share */
          background-color: #339af0; /* Blue for active state */
          color: white;
          border-color: #339af0;
        }
        
        .control-btn.leave { /* Specifically for leave/end call buttons in the list */
          background-color: #fa5252;
          color: white;
          border-color: #fa5252;
        }
        
        .control-btn.leave:hover {
          background-color: #e03131;
        }
        
        .call-info {
          text-align: center;
          color: #495057; /* Darker grey for readability */
          font-size: 0.9rem;
          margin: 0;
        }

        /* Connecting State UI */
        .connecting-call-info {
          background-color: #f0f0f0; /* Light grey background */
          border-radius: 8px;
          padding: 15px;
          margin-top: 10px;
          text-align: center;
          border: 1px dashed #ccc; /* Dashed border to indicate temp state */
        }

        .connecting-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #333; /* Darker text */
          font-weight: 500;
          font-size: 0.95rem;
        }

        .connecting-icon svg { /* Target SVG within for animation if needed */
          color: #4CAF50; /* Green phone icon */
          animation: pulse 1.5s infinite ease-in-out;
        }

        .connecting-loader {
          margin-top: 12px;
        }

        .connecting-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
        }

        .connecting-dots span {
          width: 8px;
          height: 8px;
          background-color: #888; /* Darker dots */
          border-radius: 50%;
          display: inline-block;
          animation: dot-animation 1.4s infinite ease-in-out;
        }

        .connecting-dots span:nth-child(1) { animation-delay: 0s; }
        .connecting-dots span:nth-child(2) { animation-delay: 0.2s; }
        .connecting-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes dot-animation {
          0%, 100% { transform: translateY(0); background-color: #888; }
          50% { transform: translateY(-4px); background-color: #555; }
        }

        /* Call Modal Styles */
        .call-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75); /* Darker overlay */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999; /* Ensure it's on top */
          padding: 20px; /* Add some padding for smaller screens */
        }
        
        .call-modal-content {
          background-color: white;
          border-radius: 12px; /* More pronounced radius */
          padding: 25px 30px; /* More padding */
          width: 90%;
          max-width: 650px; /* Slightly wider max-width */
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.35); /* Stronger shadow */
          display: flex;
          flex-direction: column; /* Ensure content flows vertically */
        }
        
        .call-modal-content .call-video {
          height: 300px; /* Or responsive height e.g., aspect-ratio */
          width: 100%; /* Ensure it takes full width of modal content */
        }
        
        .call-modal-content .call-controls {
          margin: 20px 0; /* Vertical margin */
        }
      `}</style>
    </div>
  )
}

export default MyAppointments
