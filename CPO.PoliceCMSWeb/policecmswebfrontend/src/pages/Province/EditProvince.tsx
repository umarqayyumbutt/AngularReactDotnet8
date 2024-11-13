import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../redux/Store/store';
import { updateProvince, fetchProvinces } from '../../redux/Slices/provinceSlice';

const EditProvince: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const provinces = useSelector((state: RootState) => state.provinces.provinces);
  const token = useSelector((state: RootState) => state.auth.token);
  const [name, setName] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchProvinces(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    const province = provinces.find((p) => p.id === parseInt(id as string));
    if (province) {
      setName(province.provincename);
    }
  }, [id, provinces]);

  const handleUpdate = () => {
    const province = { id: parseInt(id as string), provincename:name,createdby:0 };
    if (token) {
        console.log(province);
      dispatch(updateProvince({ province, token })).then(() => navigate('/province/provinces'));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-1">
        <div className="flex flex-col gap-12">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
              Edit Province
              </h3>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Province Name
                    </label>
                    <input
                      type="text"
                      id="provincename"
                      name="provincename"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your user name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>                
                </div>

                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      {/* <h2>Edit Province</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form> */}
    </div>
  );
};

export default EditProvince;
