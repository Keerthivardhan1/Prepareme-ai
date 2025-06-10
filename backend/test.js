
class Exp extends Error {
    constructor(msg , err) {
        super(msg)
        this.msg =msg
        this.error = err
    }
}

function fail() {
    let obj = null;
    try {
        
        obj.method(); // Cannot read properties of null
    } catch (error) {
        throw new Exp("somthing" , error)
    }
  }
  
  try {
    fail();
  } catch (err) {
    console.error('Caught:', err.msg);
    console.log("actual msg", err.error.message );
    
  }
  