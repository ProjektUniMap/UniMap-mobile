import { supabase } from '../lib/supabase';
import { Profile } from '../types';

export const getProfileById = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error getting profile by id', error);
    return null;
  }
  return data as Profile;
};
