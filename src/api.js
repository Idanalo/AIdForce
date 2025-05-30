//const BASE_URL = "http://localhost:3000"; // Update if hosted remotely
const BASE_URL = "http://amitaimalka.pythonanywhere.com"; // Update if hosted remotely
// const BASE_URL = ''
// https://amitaimalka.pythonanywhere.com
// ========== 🟢 CHAT SESSION ==========

export async function startSession(email) {
  const res = await fetch(`${BASE_URL}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  console.log("startSession response:", res);
  return res.json();
}

export async function sendMessage(session, message) {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 'email': session, message }),
  });
  return res.json();
}

export async function finishSession(email) {
  const res = await fetch(`${BASE_URL}/finish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

// ========== 📤 SETTERS ==========

export async function setUserData(data) {
  const res = await fetch(`${BASE_URL}/set_user_data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // { email, name, birth_date }
  });
  return res.json();
}

export async function setInjuryInfo(data) {
  const res = await fetch(`${BASE_URL}/set_injury_info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function setPreferences(data) {
  const res = await fetch(`${BASE_URL}/set_prefrences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ========== 📥 GETTERS ==========

export async function getName(email) {
  const res = await fetch(`${BASE_URL}/get_name`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  console.log("getName response:", res);
  return res.json();
}

export async function getAge(email) {
  const res = await fetch(`${BASE_URL}/get_age`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function getInjuryInfo(email) {
  const res = await fetch(`${BASE_URL}/get_injury_info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function getPreferences(email) {
  const res = await fetch(`${BASE_URL}/get_prefrences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function getCombinedProfile(email) {
  const res = await fetch(`${BASE_URL}/get_combined_profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}
