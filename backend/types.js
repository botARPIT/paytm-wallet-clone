import zod from 'zod';

const UserDetails = zod.object({
    firstname : zod.string(),
    lastname : zod.string(),
    username : zod.string().email(),
    password : zod.string().min(8)
})


const updateUser = zod.object({
    firstname : zod.string().optional(),
    lastname : zod.string().optional(),
    password : zod.string().min(8).optional()
})

export {UserDetails, updateUser}