import { createSlice,createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ProvinceData } from '../../types/ProvinceData';
import userServices from '../../services/userServices';
import { useDispatch, useSelector } from 'react-redux';

interface ProvinceState {
  provinces:ProvinceData[];
  loading:boolean;
  error:string|null;
}

const initialState: ProvinceState = {
  provinces:[],
  loading:false,
  error:null,
};
//const token = useSelector((state: RootState) => state.auth.token);
export const fetchProvinces = createAsyncThunk('provinces/fetchProvinces', async (token: string) => {
    const provinces= await userServices.getAllProvinces(token);
   // console.log(provinces);
    return provinces;
  });
  
  // Async thunk to delete a province
  export const deleteProvince = createAsyncThunk('provinces/deleteProvince', async ({ id, token }:{id:number;token: string}) => {
    await userServices.deleteProvince(token,id);
    return id;
  });
  
  // Async thunk to update a province
  export const updateProvince = createAsyncThunk(
    'provinces/updateProvince',
    async ({ province, token }: { province: ProvinceData; token: string }) => {
      return await userServices.updateProvince(token,province);
    }
  );
const provinceSlice = createSlice({
    name: 'provinces',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProvinces.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProvinces.fulfilled, (state, action: PayloadAction<ProvinceData[]>) => {
          state.provinces = action.payload;
          state.loading = false;
        })
        .addCase(fetchProvinces.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch provinces';
        })
        .addCase(deleteProvince.fulfilled, (state, action: PayloadAction<number>) => {
          state.provinces = state.provinces.filter((province) => province.id !== action.payload);
        })
        .addCase(updateProvince.fulfilled, (state, action: PayloadAction<ProvinceData>) => {
          const index = state.provinces.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) {
            state.provinces[index] = action.payload;
          }
        });
    },
  });
  
  export default provinceSlice.reducer;