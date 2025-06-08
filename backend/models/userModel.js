import { supabase } from "../services/supabaseClient.js";

export const createUser = async ({name , email , password , role='Student'}) =>{
    const {data ,error} = await supabase
        .from('users')
        .insert([{name , email , password , role}])
        .select()
        .single()

    if(error) throw error

    return data
}

export const getUserByEmail = async ({email}) => {
    // console.log(email)
    const {data, error} = await supabase
        .from('users')
        .select('*')
        .eq('email' , email)
        .single()
    
    // console.log("error : " + error);
    // console.log("data : " + data);
    

    if(error) throw error
    return data
}


export const getUserById = async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
  
    if (error) throw error;
    return data;
  };
