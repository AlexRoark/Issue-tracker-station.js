document.getElementById("submit_issue").addEventListener("submit", newIssue);

function newIssue(event) {
  event.preventDefault();
  const id = `issue${(~~(Math.random() * 1e8)).toString(16)}`;
  const title = document.getElementById("submit_title").value;
  const description = document.getElementById("submit_description").value;
  const severity = document.getElementById("submit_severity").value;
  const assignee = document.getElementById("submit_assignee").value;
  const status = "";
  const newIssue = {
    id,
    title,
    description,
    severity,
    assignee,
    status,
  };

  if (localStorage.getItem("issues") === null) {
    const issues = [newIssue];
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    const issues = JSON.parse(localStorage.getItem("issues"));
    const updatedIssues = [...issues, newIssue];
    localStorage.setItem("issues", JSON.stringify(updatedIssues));
  }

  document.getElementById("submit_issue").reset();

  fetchIssues();
}

function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issueWrapper = document.querySelector(".masonry_wrapper");
  issueWrapper.innerHTML = ``;

  if (localStorage.getItem("issues") === null) {
    console.log("Issues is not found");
  } else {
    [...issues].forEach((issue) => {
      const newIssue = issueElement(issue);
      issueWrapper.innerHTML += newIssue;
    });
  }
}

const issueElement = (issue) => {
  const { id, title, description, severity, assignee, status } = issue;
  return `
      <div class="items issue" id="issue">
              <div class="status ${status}" ></div>
              <div class="title">${title}</div>
              <div class="id">ID: ${id}</div>
              <div class="discription">${description}</div>
              <div class="assignee_severity"><img src="./src/user.png" alt=""> <span class="assignee">${assignee}</span> <img src="./src/bug.png" alt=""> <span class="severity">${severity}</span></div>
              <button type="submit" onclick="closeIssue('${id}')" id="close" class="space ${status}-btn">Close</button><button type="submit" onclick="deleteIssue('${id}')" id="delete" class="space">Delete</button>
      </div>`;
};

function closeIssue(id) {
  event.target.disabled = true;
  const issues = JSON.parse(localStorage.getItem("issues"));

  const updatedIssues = issues.map((issue) => {
    if (issue.id === id) issue.status = "status-cls";
    return issue;
  });

  localStorage.setItem("issues", JSON.stringify(updatedIssues));
  fetchIssues();
}

function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));

  const updatedIssues = issues.filter((issue) => issue.id !== id);
  localStorage.setItem("issues", JSON.stringify(updatedIssues));
  fetchIssues();
}

document.addEventListener("DOMContentLoaded", fetchIssues);
