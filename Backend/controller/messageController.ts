import {Request,Response} from "express"
import prisma from "../db/prisma";

export const sendMessage = async (req:Request,res:Response): Promise<any> =>{
    try {
        const {message} =req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user.id;
        console.log(receiverId);
        console.log(senderId);

        let conversation = await prisma.conversation.findFirst({
            where:{
                participantsIDs:{
                    hasEvery: [senderId,receiverId]



                }
            }
        })
        if(!conversation){
            conversation =await prisma.conversation.create({
                data:{
                    participantsIDs:{
                        set: [senderId,receiverId],
                    }
                }
            })
        }
        const newMessage = await prisma.message.create({
            data:{
                senderId,
                body:message,
                conversationId: conversation.id
            }
        })
       
        if(newMessage) {
            conversation = await prisma.conversation.update({
                where:{
                    id:conversation.id,
                },
                data:{
                    messages:{
                        connect:{
                            id:newMessage.id
                        }
                    }
                }
            })
        }

          return res.status(201).json({
            message:"message creates successfully",
            messages:newMessage.body,
            ans:newMessage
        })
    } catch (error:any) {
        console.log("Error in send message:", error)
        res.status(500).json({error:"Internal server error"})
    }
}


export const getMessages = async (req: Request, res: Response): Promise<any> =>{
    try {
        const {id:userToChatId} = req.params;

        const senderId = req.user.id;
        
      const conversation = await prisma.conversation.findFirst({
        where:{
            participantsIDs:{
                hasEvery:[senderId,userToChatId] 
            }
        },
        include:{
            messages:{
                orderBy:{
                    createdAt:"asc"
                }
            }
        }
      })

      if(!conversation){
        return res.status(400).json([]); 
      }

      console.log(conversation);
      res.status(201).json({messages:conversation})

    } catch (error) {
        console.log("Error in send message:", error)
        res.status(500).json({error:"Internal server error"})
    }
}


export const getUserForSideBar = async (req: Request, res: Response): Promise<any> =>{
           try {
                const Authorid = req.user.id
                
                const users = await prisma.user.findMany({
                    where :{
                        id:{
                            not: Authorid
                        }
                    },
                    select:{
                        id:true,
                        fullname:true,
                        profilePic:true
                    }
                })
                return res.status(200).json({message:users})


           } catch (error:any) {
            console.log("Error in send message:", error)
            res.status(500).json({error:"Internal server error"})
           }
}