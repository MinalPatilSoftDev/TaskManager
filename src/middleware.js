import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value;

  // Allow access to specific routes without authentication
  const allowedRoutesWithoutAuth = [
    "/",
    "/api/login",
    "/api/users",
    "/api/forgot-password",
    "/api/reset-password",
    "/api/current", // Allow access to /api/current without authentication
  ];

  if (allowedRoutesWithoutAuth.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the home page for secured routes
  const securedRoutes = [
    "/add-task",
    "/show-tasks",
    "/user_profile",
    "/settings",
  ];

  if (!authToken) {
    if (securedRoutes.includes(request.nextUrl.pathname) || request.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If the user is authenticated or the path doesn't require authentication, allow access
  return NextResponse.next();
}

// Matching Paths configuration
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/add-task",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*",
  ],
};



// export function middleware(request) {
//   console.log("middleware executed");

//   const authToken = request.cookies.get("authToken")?.value;
//   console.log("middleware console-Token:",authToken);

//   if (
//     request.nextUrl.pathname === "/api/login"||request.nextUrl.pathname === "/api/users"
//   ) {
//     return;
//   }

//   const loggedInUserNotAccessPaths = request.nextUrl.pathname === "/login" || request.nextUrl.pathname == "/signup" ; 

//   if (loggedInUserNotAccessPaths) {
    
//     if (authToken) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   } else {
   
//       if (!authToken) 
//       {
//           if (request.nextUrl.pathname.startsWith("/api")) {
          
//             // if(request.nextUrl.pathname.startsWith("/api/current")){
//             //   return 
//             // }

//             // Allow access to forgot-password and reset-password routes
//                 if (
//                   request.nextUrl.pathname.startsWith("/api/forgot-password") ||
//                   request.nextUrl.pathname.startsWith("/api/reset-password")
//                 ) {
//                   return NextResponse.next();
//                 }

//                 return NextResponse.json(
//                   {
//                     message: "Access Denied !!",
//                     success: false,
//                   },
//                   {
//                     status: 401,
//                   }
//                 );
//           }

//           // Redirect to login page for non-API routes if user is not authenticated
//           return NextResponse.redirect(new URL("/", request.url));
//       }else {
//           // varify...
//       }
//   }

//   // Allow access to "/api/current" route
//   if (request.nextUrl.pathname.startsWith("/api/current")) {
//     return NextResponse.next();
//   }

//   //   return NextResponse.redirect(new URL("/home", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     "/",
//     "/login",
//     "/signup",
//     "/add-task",
//     "/show-tasks",
//     "/profile/:path*",
//     "/api/:path*",
   
//   ],
// };
