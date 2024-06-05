import { supabase } from '../lib/supabase';
import { Profile, SearchResult, UserSaves } from '../types';

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

export const getUserSavedRooms = async (id: string) => {
  const { data, error } = await supabase
    .from('user_saves')
    .select('room_id')
    .eq('user_id', id);
  if (error) {
    console.error('Error getting saved rooms', error);
    return null;
  }
  return data as UserSaves[];
};

export const getUserSavedRoomsAsSearchResults = async (id: string) => {
  const response = await supabase.rpc('get_user_favorites', {
    uid: id,
  });
  return { data: response.data as SearchResult[], error: response.error };
};

export const isUserSavedRoom = async (user_id: string, room_id: number) => {
  const { data, error } = await supabase
    .from('user_saves')
    .select('*')
    .eq('user_id', user_id)
    .eq('room_id', room_id)
    .single();
  if (error) {
    // console.error('Error getting saved rooms', error);
    return null;
  }
  return data as UserSaves;
};

export const createUserSavedRoom = async (user_id: string, room_id: number) => {
  const { data, error } = await supabase
    .from('user_saves')
    .upsert([
      {
        user_id,
        room_id,
      },
    ])
    .select('*')
    .single();
  if (error) {
    console.error('Error creating saved room', error);
    return null;
  }
  console.log('created', data, error);
  return data;
};

export const deleteUserSavedRoom = async (user_id: string, room_id: number) => {
  const { data, error } = await supabase
    .from('user_saves')
    .delete()
    .eq('user_id', user_id)
    .eq('room_id', room_id)
    .select('*')
    .single();
  if (error) {
    console.error('Error deleting saved room', error);
    return null;
  }
  console.log('deleted', data, error);
  return data;
};
