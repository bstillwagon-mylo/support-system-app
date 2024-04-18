import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

export async function isValidEmail(email: string) {
    // Simple email validation
    return emailRegex.test(email);
  };

  
export const useSupabaseSession = () => {
    const [user, setUser] = useState<any>(null);
  
    useEffect(() => {
      const checkSession = async () => {
        try {
          const { data: session, error } = await supabase.auth.getSession();
  
          if (error) {
            throw error;
          }
  
          if (session) {
            // Retrieve the user's session information from local storage
            const storedUser = localStorage.getItem('supabaseUser');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          } else {
            setUser(null);

          }
        } catch (error) {
          console.error('Error checking session:', error);
        }
      };
  
      checkSession();
    }, []);
  
    return { user };
  };
  
  export default useSupabaseSession;