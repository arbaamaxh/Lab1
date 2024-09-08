// checkRole.js
function checkRole(allowedRoles) {
    return (req, res, next) => {
        // Assuming the user's role is stored in `req.user.role` (e.g., after authentication)
        const userRole = req.user.role;

        // Check if the user's role is in the list of allowed roles
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Access denied. You do not have the required role." });
        }

        // If the role is allowed, proceed to the next middleware or route handler
        next();
    };
}

module.exports = checkRole;
