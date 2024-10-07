// netlify/functions/authenticate.js
exports.handler = async (event) => {
  console.log("Authenticate function called");
  let password;
  try {
    const body = JSON.parse(event.body);
    password = body.password;
    console.log("Received password:", password);
  } catch (error) {
    console.error("Error parsing request body:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  const correctPassword = process.env.PASSWORD;
  console.log("Correct password:", correctPassword);

  if (password === correctPassword) {
    console.log("Password matched");
    return {
      statusCode: 200,
      body: JSON.stringify({ authenticated: true, token: correctPassword }),
    };
  } else {
    console.log("Password did not match");
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid password" }),
    };
  }
};

// netlify/functions/get-content.js
exports.handler = async (event) => {
  console.log("Get content function called");
  const authHeader = event.headers.authorization;
  console.log("Auth header:", authHeader);

  const correctPassword = process.env.PASSWORD;
  console.log("Correct password:", correctPassword);

  if (authHeader === `Bearer ${correctPassword}`) {
    console.log("Token matched");
    const protectedContent = `
      <h1>Protected Content</h1>
      <p>This is your protected static content. Reema is awesome!</p>
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ content: protectedContent }),
    };
  } else {
    console.log("Token did not match");
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }
};
