"use client"

import { useState, useEffect, useRef } from "react"
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

function MyAppointments({ onClose, addNotification }) {
  // Include the appointments data directly in the component
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      with: "Dr. Emily Carter (Career Advisor)",
      dateTime: "2024-09-10 at 10:00 AM",
      status: "Confirmed",
      isUserOnline: true,
      callState: null, // null, 'incoming', 'active'
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
      with: "SCAD Officer Jane Smith",
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

  // Timer refs to track timeouts
  const timerRefsRef = useRef({})

  const handleAcceptAppointment = (id) => {
    const appointment = appointments.find((app) => app.id === id)
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Confirmed", callState: null } : app)),
    )

    // Add notification
    addNotification(`You accepted appointment with ${appointment.with}`, "success")

    // Simulate SCAD Officer accepting your appointment
    setTimeout(() => {
      addNotification(`${appointment.with} was notified of your acceptance`, "info")
    }, 1000)
  }

  const handleRejectAppointment = (id) => {
    const appointment = appointments.find((app) => app.id === id)
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Rejected by You", callState: null } : app)),
    )

    // Add notification
    addNotification(`You rejected appointment with ${appointment.with}`, "error")

    // Simulate notification to the other party
    setTimeout(() => {
      addNotification(`${appointment.with} was notified of your rejection`, "info")
    }, 1000)
  }

  const handleSimulateIncomingCall = (id) => {
    alert(
      `(Simulated) Incoming call for appointment ${id} - You would receive a system notification and this UI would appear.`,
    )
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, callState: "incoming" } : { ...app, callState: null })),
    ) // Only one incoming at a time
  }

  const handleAcceptCall = (id) => {
    const appointment = appointments.find((app) => app.id === id)
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, callState: "active" }
          : { ...app, callState: app.callState === "active" ? null : app.callState },
      ),
    )
    setCallControls({ videoEnabled: true, micMuted: false, screenShared: false })

    // Add notification
    addNotification(`Call started with ${appointment.with}`, "call")
  }

  const handleRejectCall = (id) => {
    const appointment = appointments.find((app) => app.id === id)
    setAppointments((prev) => prev.map((app) => (app.id === id ? { ...app, callState: null } : app)))

    // Add notification
    addNotification(`You rejected call from ${appointment.with}`, "call")
  }

  const handleStartCall = (id) => {
    alert(`Call started for appointment ${id}.`)
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, callState: "active" }
          : { ...app, callState: app.callState === "active" ? null : app.callState },
      ),
    )
    setCallControls({ videoEnabled: true, micMuted: false, screenShared: false })
  }

  const handleLeaveCall = (id) => {
    const appointment = appointments.find((app) => app.id === id)
    setAppointments((prev) => prev.map((app) => (app.id === id ? { ...app, callState: null } : app)))

    // Add notification
    addNotification(`You left the call with ${appointment.with}`, "call")

    // Clear any existing timer for this appointment
    if (timerRefsRef.current[`leave_${id}`]) {
      clearTimeout(timerRefsRef.current[`leave_${id}`])
    }

    // Add delayed notification after 10 seconds
    timerRefsRef.current[`leave_${id}`] = setTimeout(() => {
      addNotification(`Call with ${appointment.with} ended 10 seconds ago`, "info")
      delete timerRefsRef.current[`leave_${id}`]
    }, 10000)
  }

  const handleSimulateOtherUserLeft = (id) => {
    const appointment = appointments.find((app) => app.id === id)
    setAppointments((prev) => prev.map((app) => (app.id === id ? { ...app, callState: null } : app)))

    // Add notification
    addNotification(`${appointment.with} has left the call`, "call")

    // Clear any existing timer for this appointment
    if (timerRefsRef.current[`leave_${id}`]) {
      clearTimeout(timerRefsRef.current[`leave_${id}`])
    }

    // Add delayed notification after 10 seconds
    timerRefsRef.current[`leave_${id}`] = setTimeout(() => {
      addNotification(`Call with ${appointment.with} ended 10 seconds ago`, "info")
      delete timerRefsRef.current[`leave_${id}`]
    }, 10000)
  }

  const toggleVideo = () => setCallControls((prev) => ({ ...prev, videoEnabled: !prev.videoEnabled }))
  const toggleMic = () => setCallControls((prev) => ({ ...prev, micMuted: !prev.micMuted }))
  const toggleScreenShare = () => setCallControls((prev) => ({ ...prev, screenShared: !prev.screenShared }))

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      // Clean up any active timers when component unmounts
      Object.values(timerRefsRef.current).forEach((timerId) => {
        clearTimeout(timerId)
      })
    }
  }, [])

  // Auto-end first call after 15 seconds (demo feature)
  useEffect(() => {
    // Find the first call that's active
    const firstActiveCall = appointments.find((app) => app.id === 1 && app.callState === "active")

    if (firstActiveCall) {
      // Set a timer to automatically end the call after 15 seconds
      const autoEndTimer = setTimeout(() => {
        // Update the call state
        setAppointments((prev) => prev.map((app) => (app.id === 1 ? { ...app, callState: null } : app)))

        // Add notification
        addNotification(`Call with ${firstActiveCall.with} automatically ended after 15 seconds`, "call")

        // Add delayed notification after 10 seconds
        setTimeout(() => {
          addNotification(`Call with ${firstActiveCall.with} ended 10 seconds ago`, "info")
        }, 10000)
      }, 15000) // 15 seconds

      // Clean up the timer if component unmounts or call state changes
      return () => clearTimeout(autoEndTimer)
    }
  }, [appointments, addNotification])

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
      <div className="appointments-list">
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

            {/* Appointment Acceptance/Rejection Controls */}
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

            {/* Call Initiation / Incoming Call Simulation */}
            {app.status === "Confirmed" && app.callState === null && (
              <div className="appointment-actions">
                <button onClick={() => handleStartCall(app.id)} className="action-btn primary">
                  <Phone size={14} /> Start Call
                </button>
                <button onClick={() => handleSimulateIncomingCall(app.id)} className="action-btn secondary">
                  <PhoneIncoming size={14} /> Simulate Incoming Call
                </button>
              </div>
            )}
            {app.status === "Pending SCAD Officer Acceptance" && app.callState === null && (
              <p className="pending-info">
                <em>Waiting for SCAD Officer to confirm. You'll be notified.</em>
              </p>
            )}

            {/* Incoming Call UI */}
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

            {/* Active Call Controls UI */}
            {app.callState === "active" && (
              <div className="call-controls-container">
                <p className="in-call-status">
                  <strong>In Call with {app.with}</strong>
                </p>
                <div className="call-controls">
                  <button
                    onClick={toggleVideo}
                    className={`control-btn ${callControls.videoEnabled ? "" : "disabled"}`}
                  >
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
                  <button onClick={toggleMic} className={`control-btn ${callControls.micMuted ? "disabled" : ""}`}>
                    {callControls.micMuted ? (
                      <>
                        <Mic size={16} /> Unmute
                      </>
                    ) : (
                      <>
                        <MicOff size={16} /> Mute
                      </>
                    )}
                  </button>
                  <button
                    onClick={toggleScreenShare}
                    className={`control-btn ${callControls.screenShared ? "active" : ""}`}
                  >
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
                <div className="call-actions-footer">
                  <button onClick={() => handleLeaveCall(app.id)} className="control-btn leave">
                    <PhoneOff size={16} /> Leave Call
                  </button>
                  <button onClick={() => handleSimulateOtherUserLeft(app.id)} className="control-btn secondary">
                    Simulate Other Left
                  </button>
                </div>
                <p className="call-notification">
                  <em>You will be notified (in the bell icon) when the other caller leaves the call.</em>
                </p>
              </div>
            )}
          </div>
        ))}
        {appointments.length === 0 && <p>You have no upcoming appointments.</p>}
      </div>
    </div>
  )
}

export default MyAppointments
