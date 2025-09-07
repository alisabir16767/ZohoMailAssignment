export default function Footer() {
   return (
     <footer className="w-full bg-gray-100 border-t py-6 mt-12">
       <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 text-sm">
         <p>© {new Date().getFullYear()} SmallBus. All rights reserved.</p>
         <div className="mt-2 flex justify-center gap-4 text-gray-500">
           <a href="/terms" className="hover:text-blue-600">
             Terms
           </a>
           <a href="/privacy" className="hover:text-blue-600">
             Privacy
           </a>
           <a href="/contact" className="hover:text-blue-600">
             Contact
           </a>
         </div>
       </div>
     </footer>
   );
 }
 