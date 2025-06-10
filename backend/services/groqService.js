import { Groq } from "groq-sdk";
import Instructor from "@instructor-ai/instructor"; // npm install @instructor-ai/instructor
import { z } from "zod"; // npm install zod

// Set up the client with Instructor
const groq = new Groq();
const instructor = Instructor({
  client: groq,
  mode: "TOOLS"
})

const TaskSchema = z.object({
    title : z.string().describe("Task title"),
    description : z.string().describe("detaild description of the task in 1 or 2 lines")
})

const DaySchema = z.object({
    tasks : z.array(TaskSchema).describe("List of tasks")
})

const RoadmapSchema = z.object({
    title : z.string().describe("title of the roadmap"),
    description : z.string().describe("detaild description of the roadmap in 1 or 2 lines"),
    days : z.array(DaySchema)
})

// System prompt with clear instructions about the complex structure
const systemPrompt = `
You are an expert roadmap planner AI. You generate structured, hierarchical learning plans in JSON format based on syllabus, exam date, and current date. Your output strictly follows a schema matching a PostgreSQL database with the following structure:
A roadmap consists of multiple weeks.
Each week contains multiple days.
Each day has a list of tasks.

Follow this schema:
{
  "title": "Name of the Roadmap",
  "description": "Brief description of the exam preparation plan",
  "end_date": "YYYY-MM-DD",
  "weeks": [
    {
      "week_number": 1,
      "days": [
        {
          "day_number": 1,
          "tasks": [
            {
              "title": "Task Title",
              "description": "Short summary of what to study/do",
              "resources": [
                "https://example.com/resource1",
                "https://example.com/resource2"
              ]
            }
          ]
        }
      ]
    }
  ]
}
`;

export async function generateRoadMap({userInput}) {
  try {
    // Use instructor to create and validate in one step
    const roadmap = await instructor.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_model: {
        name: "Roadmap",
        schema: RoadmapSchema,
      },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput },
      ],
      max_retries: 3,
    });

    return roadmap;
  } catch (error) {
    console.error("Error:", error);
  }
}

