import helmet, { xssFilter } from 'helmet';

// Enable security headers with Helmet
const enableSecurityHeaders = helmet();

// Protect against cross-site scripting (XSS) attacks
const protectAgainstXSS = xssFilter();
export {protectAgainstXSS}
export default enableSecurityHeaders ;
