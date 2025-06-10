import { ModelError } from "../../Errors/modelErrors"
import { supabase } from "../../services/supabaseClient"

export const removeRoadmap = async (roadmapId) => {
    const {error} = await supabase
        .from('roadmaps')
        .delete()
        .eq("id" , roadmapId)

    if(error){
        throw new ModelError("error while removing the roadmap" , error)
    }
}

export const removeWeek = async (weekId) => {
    const {error} = await supabase
        .from('weeks')
        .delete()
        .eq("id" , weekId)

    if(error){
        throw new ModelError("error while removing the week" , error)
    }
}

export const removeWeeksByRoadMapId = async (roadmapId)=>{
    const {error} = await supabase
    .from('weeks')
    .delete()
    .eq("id" , roadmapId)

    if(error){
        throw new ModelError("error while removing the weeks by roadmapId" , error)
    }
}

export const removeDay = async (dayId) => {
    const {error} = await supabase
    .from('days')
    .delete()
    .eq("id" , dayId)

    if(error){
        throw new ModelError("error while removing the day" , error)
    }
    
}

export const removeDaysByWeekId = async (weekId) => {
    const {error} = await supabase
    .from('days')
    .delete()
    .eq("id" , weekId)

    if(error){
        throw new ModelError("error while removing the days by weekId" , error)
    }
    
}

export const removeTask = async (taskId) => {
    const {error} = await supabase
    .from('tasks')
    .delete()
    .eq("id" , taskId)

    if(error){
        throw new ModelError("error while removing the task" , error)
    }
}


export const removeTasksByDayId = async (dayid) => {
    const {error} = await supabase
    .from('tasks')
    .delete()
    .eq("id" , dayid)

    if(error){
        throw new ModelError("error while removing the task by dayid " , error)
    }
}

