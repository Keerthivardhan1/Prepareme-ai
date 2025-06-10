
// registerTemplate = 1
export const registerTemplate = ({username})=>{
    return `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <h2 style="color: #333;">Welcome to <strong>PrepareMe AI</strong>!</h2>
            <p>Hi there,</p>
            <p>Thanks ${username} for signing up. We're excited to have you on board.</p>
            <p>Click the button below to get started:</p>
            <a href="https://prepareme.ai/start" 
                style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                Get Started
            </a>
            <p style="margin-top: 20px;">Best regards,<br/>The PrepareMe AI Team</p>
            </div>
        `
}

// reminderTemplate = 2
export const reminderTemplate = ({text , taskname , description , taskdetails , tasklink})=>{
    `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <h2 style="color: #333;">⏰ Task Reminder from <strong>PrepareMe AI</strong></h2>
            
            <p style="color: #555;">Hi there,</p>

            <p style="color: #555;">  
            This is a friendly reminder about an upcoming task you have scheduled. Stay on track and make the most of your productivity!
            ${text}
            </p>

            <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <h3 style="margin-top: 0; color: #007bff;">📌 Task: ${taskname}</h3>
                <p style="margin: 10px 0; color: #333;"><strong>Description:</strong> ${description}</p>
                <p style="margin: 10px 0; color: #333;"><strong>Details:</strong> ${taskdetails}</p>
            </div>

            <p style="color: #555;">Click below to view or complete the task:</p>

            <a href="${tasklink}"
                style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                View Task
            </a>

            <p style="margin-top: 30px; color: #555;">You've got this!<br/>– The PrepareMe AI Team</p>
            </div>

            `
}

// RoadmapCompletionTemplate = 3
export const RoadmapCompletionTemplate = ({username , roadmapName , nextStepLink=""})=>{
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
  <h2 style="color: #333;">🏁 You Completed a Roadmap!</h2>
  <p>Hi ${username},</p>
  <p>Congratulations! You've just completed the <strong>${roadmapName}</strong> roadmap.</p>

  <p>This is a big step in your learning journey. Keep pushing forward!</p>

  <a href="${nextStepLink}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">
    Explore More
  </a>

  <p style="margin-top: 30px;">– The PrepareMe AI Team</p>
</div>

    `
}

// generalAnnuncement = 4
export const generalAnnuncement = ({announcementTitle ,username, announcementBody, actionlink=undefined })=>{
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <h2 style="color: #333;">📢 ${announcementTitle}</h2>
        <p>Hi ${username},</p>
        <p>${announcementBody}</p>

        ${actionlink ? `
            <a href="{{actionLink}}" style="display: inline-block; padding: 10px 20px; background-color: #17a2b8; color: white; text-decoration: none; border-radius: 5px;">
            {{actionText}}
            </a>
            ` : ``}

        <p style="margin-top: 20px;">Stay curious, keep learning!</p>
        <p>– The PrepareMe AI Team</p>
        </div>

    `
}
