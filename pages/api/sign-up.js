// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  console.log('LOGGING SIGNUP', req.body)
  const { name, email, pictureFile } = req.body
  try {
    // check if email already registered
    if (await isEmailAlreadyRegistered(email)) {
      res.statusCode = 400
      return res.json({ error: 'user/already-registered', message: 'User already registered' })
    }

    // create new register with user data
    await doRegisterUser({ name, email, pictureFile })

    res.statusCode = 201
    res.end()
  } catch (error) {
    // todo handle error properly
    console.error(error)

    res.statusCode = 500
    res.end()
  }
}

async function isEmailAlreadyRegistered (email) {
  // todo implement this
  return false
}

async function doRegisterUser (userDate) {
  // todo implement this
}
