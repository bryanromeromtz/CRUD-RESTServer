const adminRole = (req, res, next) => {

  if (!req.user) {
    return res.status(500).json({
      msg: 'You want to verify the role without validating the token first'
    })
  }

  const { role, name } = req.user;
  if (role !== 'ADMIN_ROLE') {
    res.status(401).json({
      msg: `${name} is not administrator`
    })
  }

  next();
}

const hasARole = (...roles) => {
  return (req, res, next) => {
    console.log(roles, req.user.role);
    if (!req.user) {
      return res.status(500).json({
        msg: 'You want to verify the role without validating the token first'
      })
    }
    if (!roles.includes(req.user.role)) {
      res.status(401).json({
        msg: `The service requires one of these ${roles}`
      })
    }
    next();
  }
}

module.exports = {
  adminRole,
  hasARole
}