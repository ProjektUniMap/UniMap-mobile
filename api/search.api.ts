import { supabase } from '../lib/supabase';
import { SearchResult } from '../types';

export const searchRoomAndBuilding = async (search: string) => {
  const response = await supabase.rpc('search_rooms_with_similar_names', {
    search_term: search,
  });
  console.log(response.error, response.data);
  return { data: response.data as SearchResult[], error: response.error };
};
