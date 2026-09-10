// export const getUserAndPosts = async (f1, f2) => {
  
//   const user = await f1()
//   const posts = await f2(user.id)

//   return {user, posts}
// }

// export const getUserAndPosts = (f1, f2) => {
//   return f1()
//     .then((user) => f2(user.id)
//       .then((posts) => ({user, posts})))
// }

export const getUserAndPosts = (f1, f2) => {
  return f1()
    .then((user) => Promise.all([user, f2(user.id)]))
    .then(([user, posts]) => ({user, posts}))
}