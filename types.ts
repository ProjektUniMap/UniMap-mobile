export interface Profile {
  id: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface Room {}

export interface Building {}

export interface SearchResult {
  name: string;
  display_name: string;
  building_name: string;
  lat: number;
  lon: number;
  level: string;
  type: 'room' | 'building';
}
