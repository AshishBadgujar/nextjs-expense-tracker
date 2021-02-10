import Day from '../../models/Day'
import initDB from '../../utils/db'
import auth0 from '../../utils/auth0';
import Week from '../../models/Week';

initDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getData(req, res);
            break;
        case "PUT":
            await saveData(req, res);
            await saveDataWeek(req,res);
            break;
        case "DELETE":
            await deleteData(req, res);
        default:
            break;
    }
}

const getData = async (req, res) => {
    const {user}=req.query;
    let userData=await Day.findOne({_id:user})
    if (userData) {
        res.json(userData.days)
    }else{
        res.json([])
    }
}

const saveData = async (req, res) => {
    const {user}=req.query;
    const {text,category,amount} = req.body;
    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    if(mm<10) 
    {
        mm='0'+mm;
    }     
    if (text!=''&& amount !=null  && category!='' ) {
        try {
            const newData={text,amount,category}
            var userData=await Day.find({_id:user})
            if (userData.length==0) {
                let firstData=await new Day({
                    _id:user,
                    days:{data:newData}
                }).save()
                return res.json(firstData.days)
            }else{
                let updatedData;
                let ThisData= await Day.findOne(
                    {_id:user,
                        days:{
                            $elemMatch:{ _id:`${dd}/${mm}/${yyyy}`}
                        }
                    })
                    if (ThisData) {
                        updatedData=await Day.findOneAndUpdate(
                            {_id:user,
                                days:{
                                    $elemMatch:{ _id:`${dd}/${mm}/${yyyy}`}
                                }
                            },
                            {$push:{"days.$.data":newData}},
                            {new:true}
                            )
                        }else{
                        updatedData=await Day.findOneAndUpdate(
                            {_id:user},
                            {$push:{days:{data:newData}}},
                            {new:true}
                        )
                    }
                res.json(updatedData.days)
            }
        } catch (error) {
            console.log(error)
            return res.json({ err: 'Please add something2 !' })
        }
    }else{
        return res.json({ err: 'Please add something1 !' }) 
    }
}
const saveDataWeek = async (req, res) => {
    var yourd = new Date(Date.now() - ((new Date().getDay()) * 24 * 60 * 60 * 1000));
    var d=new Date();
    const {user}=req.query;
    const {amount} = req.body;
    if (amount !=null) {
        try {
            var weekData=await Week.find({_id:user})
            if (weekData.length==0) {
                let firstData=await new Week({
                    _id:user,
                    weeks:{days:{total:amount}}
                }).save()
            }else{
                let ThisWeekData= await Week.findOne(
                    {_id:user,
                        weeks:{
                            $elemMatch:{ _id:`${yourd.getDate()}/${yourd.getMonth()}/${yourd.getFullYear()}` }
                        }
                    })
                    if (ThisWeekData) {
                        let ThisWeekDayData= await Week.findOne(
                            {_id:user,
                                weeks:{
                                    $elemMatch:{ 
                                        _id:`${yourd.getDate()}/${yourd.getMonth()}/${yourd.getFullYear()}`,
                                        days:{
                                            $elemMatch:{_id:d.getDay()}
                                        } 
                                    }}
                            })
                            if(ThisWeekDayData){
                                await Week.findOneAndUpdate(
                                    {_id:user,
                                        weeks:{
                                            $elemMatch:{ _id:`${yourd.getDate()}/${yourd.getMonth()}/${yourd.getFullYear()}`,
                                            days:{
                                                $elemMatch:{ _id:new Date().getDay()}
                                            }                                   
                                        }
                                    }
                                },
                                {$inc:{'weeks.$[].days.$[].total':amount}},
                                )
                            }else{
                                await Week.findOneAndUpdate(
                                    {_id:user,
                                        weeks:{
                                            $elemMatch:{ _id:`${yourd.getDate()}/${yourd.getMonth()}/${yourd.getFullYear()}`}                                   
                                        }
                                    },
                                    {$push:{"weeks.$.days":{total:amount}}},
                                    )
                            }
                        }else{
                        await Week.findOneAndUpdate(
                            {_id:user},
                            {$push:{weeks:{days:{total:amount}}}},
                        )
                    }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const deleteData=async(req,res)=>{
    const {user}=req.query
    try{
        await Day.findOneAndDelete({_id:user})
        await Week.findOneAndDelete({_id:user})
    }catch(err){
        console.log(err)
    }
    res.json({message:"Deleted Successfully "})
}