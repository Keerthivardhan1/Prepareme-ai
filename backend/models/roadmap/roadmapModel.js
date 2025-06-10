import { ModelError } from "../../Errors/modelErrors";
import { generateRoadMap } from "../../services/groqService";
import { supabase } from "../../services/supabaseClient";
import { removeDaysByWeekId, removeRoadmap, removeTasksByDayId, removeWeeksByRoadMapId } from "./removeRoadmapModel";
/*

ToDo : 
    delete whole roadmap if it fails day or task or week to the database
*/

export const createRoadmap = async ({userid , examName, examDate , Syllabus }) => {
    
    const roadmap = await generateRoadMap({examName , examDate , Syllabus})

    const { roadmapData, roadmapError } = await supabase
        .from('roadmaps')
        .insert([{
        title: roadmap.title,
        description: roadmap.description,
        progress: 0,
        created_at: new Date().toISOString(),
        exam_date: examDate,
        userid :userid
        }]);
    
    if(roadmapError){
        if(roadmapData && roadmapData.id ){
            try {
                await removeRoadmap(roadmapData.id)
            } catch (error) {
                throw new ModelError("roadmap created but unable to store" , error);
                
            }
        }
        throw new ModelError("unable to store roadmap " , error)
    }

    roadmap.weeks.map( async (weektasks , index) => {
        const {weekData , weekError} = await supabase
            .from('weeks')
            .insert([
                {
                    roadmap_id : roadmapData.id,
                    week_number : weekData.week_number,
                    progress : 0
                }
            ])

        if(weekError){
            await removeWeeksByRoadMapId(roadmapData.id)
            await removeRoadmap(roadmapData.id)       
            throw ModelError("roadmap created and stored but unable to store weeks " , weekError)
        }

            weektasks.days.map( async (daytasks , index ) => {
                const {dayData , dayError } = await supabase
                    .from('days')
                    .insert([
                        {
                            day_number : daytasks.day_number,
                            progress : 0,
                            week_id : weekData.id
                        }
                    ])

                if(dayError){
                    await removeDaysByWeekId(weekData.id)
                    await removeWeeksByRoadMapId(roadmapData.id)
                    await removeRoadmap(roadmapData.id)    
                    throw dayError
                }

                    
                    daytasks.tasks.map(async (task , index) =>{
                        const {taskData , taskError} = await supabase
                            .from('tasks')
                            .insert([
                                {
                                    day_id : dayData.id,
                                    title : task.title,
                                    description : task.description,
                                    status : false,
                                    resources : task.resources,
                                    task_number : index
                                }
                            ])


                        if(taskError){
                            await removeTasksByDayId(dayData.id)
                            await removeDaysByWeekId(weekData.id)
                            await removeWeeksByRoadMapId(roadmapData.id)
                            await removeRoadmap(roadmapData.id)   
                            throw taskError
                        }
                    })
            })

    })

    return roadmap


}


export const getRoadmapsByUserId = async ({userid}) => {
    
    const { data , error  } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('userid' , userid)
    
    if(error){
        throw error
    }

    return data

}

export const getRoadmapByRoadmapId = async ({roadmapId}) => {

    const {data , error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('id' , roadmapId)

    if(error){
        return error
    }

    return data
}


export const getweeksByRoadMapId = async ({roadmap_id}) => {
    const {data , error } = await supabase
        .from('weeks')
        .select('*')
        .eq('roadmap_id' , roadmap_id )

    if(error){
        throw error
    }

    return data
}


export const getdaysByWeekId =  async ({weekid}) => {
    const {data , error } = await supabase
        .from('days')
        .select('*')
        .eq('week_id' , weekid)

    if(error){
        throw error

    }

    return data 
}


export const gettasksByDayId = async ({day_id}) => {
    const {data , error } = await supabase
        .from('tasks')
        .select('*')
        .eq('day_id' , day_id)
        .order('task_number')

    if(error){
        throw error
    }

    return data
}





