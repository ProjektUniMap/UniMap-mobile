export interface Profile {
  id: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: number;
  building_id: number;
  name: string;
  display_name: string;
  level: string;
  location: string;
  center_point: string;
  properties: Object;
  buildings?: Building;
}

export interface Building {
  gid: number;
  name: string;
  display_name: string;
  code: string;
  level_order: string[];
  geog: string;
}

export interface SearchResult {
  name: string;
  display_name: string;
  building_name: string;
  lat: number;
  lon: number;
  level: string;
  type: 'room' | 'building';
}
