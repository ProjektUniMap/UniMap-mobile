import { supabase } from '../lib/supabase';
import { FeatureCollection } from 'geojson';
import { Room } from '../types';

export const getGeoJSON = async (buildingIds: Array<Number>) => {
  const { data, error } = await supabase.rpc('export_geojson_by_building_ids', {
    building_ids: buildingIds,
  });

  if (error) {
    console.error(error);
    return { data: null, error };
  } else {
    if (data && data[0]['j']['features']) {
      return { data: data[0]['j'] as unknown as FeatureCollection, error };
    }
    return { data: null, error };
  }
};

export const getNearbyBuildings = async (
  lat: number,
  lon: number,
  radius: number,
) => {
  const { data, error } = await supabase.rpc('get_nearby_buildings', {
    lon,
    lat,
    max_distance: radius,
  });
  return { data, error };
};

export const getRoomById = async (roomId: Number) => {
  const response = await supabase
    .from('rooms')
    .select('*, buildings(*)')
    .eq('id', roomId)
    .single();
  console.log(response.data);
  return { data: response.data as Room | null, error: response.error };
};
