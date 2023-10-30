import { create } from 'zustand';
import API from '../helper/API';
import { JOBS, JOBS_APPLICATIONS } from '../helper/endpoints';
import Toast from 'react-native-toast-message';
import useLoginStore, { getToken } from './authentication/login.store';

const useJobStore = create((set, get) => ({
    nearbyjobs: {},
    job: {},
    appliedJob: undefined,
    getNearByJobs: async (skip = 0, limit = 5, coordinates) => {
        try {
            const userid = useLoginStore.getState().loggedInUser?._id;
            let params = {
                skip,
                limit,
                createdby: {
                    $nin: [userid]
                },
                coordinates,
                sortDesc: ['createdat'],
            }
            const res = await API.get(`${ JOBS }/`, {
                headers: { Authorization: await getToken() },
                params
            });

            if (res && res.data) {
                set({ nearbyjobs: res.data })
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 5))
            // Toast.show({
            //     type: 'tomatoToast',
            //     text1: 'Failed to get jobs!',
            // });
        }
    },
    clearNearByJobs: () => set({ nearbyjobs: {} }),
    clearJob: () => set({ job: {} }),
    getNearByJobById: async (id) => {
        try {
            let params = {}
            const res = await API.get(`${ JOBS }/${ id }`, {
                headers: { Authorization: await getToken() },
                params
            });

            if (res && res.data) {
                set({ job: res.data })
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 5))
            Toast.show({
                type: 'tomatoToast',
                text1: 'Failed to get a job details!',
            });
        }
    },
    applyForJob: async (payload) => {
        try {
            const res = await API.post(`${ JOBS_APPLICATIONS }`, payload, {
                headers: {
                    Authorization: await getToken(),
                },
            });

            if (res?.data) {
                // console.log(JSON.stringify(res?.data, null, 4));
                Toast.show({
                    type: 'success',
                    text1: 'Applied successfully!',
                });
                return res?.data?._id;
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 4));
            Toast.show({
                type: 'tomatoToast',
                text1: 'Something went wrong!',
            });
            return false;
        }
    },
    updateUserProfileStore: async (userid, data) => {
        try {
            const res = await API.patch(`${ USER }/${ userid }`, data, {
                headers: {
                    Authorization: await getToken(),
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res?.data) {
                useLoginStore.getState().setloggedInUser(res.data);
                Toast.show({
                    type: 'success',
                    text1: 'Profile Updated successfully!',
                });
                return true;
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 4));
            Toast.show({
                type: 'tomatoToast',
                text1: 'Failed to save data!',
            });
            return false;
        }
    },
    postJobs: async (payload) => {
        try {
            const res = await API.post(`${ JOBS }`, payload, {
                headers: {
                    Authorization: await getToken(),
                },
            });

            if (res?.data) {
                Toast.show({
                    type: 'success',
                    text1: 'Job created successfully!',
                });
                return true;
            }
        } catch (error) {
            console.log(JSON.stringify(error, null, 4));
            Toast.show({
                type: 'tomatoToast',
                text1: 'Failed to post a job!',
            });
            return false;
        }
    },
    getJobApplicationByParams: async (jobid, userid) => {
        try {
            let params = {
                appliedby: userid,
                jobid: jobid
            }
            const res = await API.get(`${ JOBS_APPLICATIONS }`, {
                headers: { Authorization: await getToken() },
                params
            });

            if (res && res.data && res?.data?.total !== 0) {
                set({ appliedJob: res.data?.data?.at(0) })
            }
        } catch (error) {
            console.log("🍿🍿", JSON.stringify(error, null, 5))
            // Toast.show({
            //     type: 'tomatoToast',
            //     text1: 'Failed to get a job details!',
            // });
        }
    },
    getAppliedJobDetailsById: async (id) => {
        try {
            const res = await API.get(`${ JOBS_APPLICATIONS }/${ id }`, {
                headers: { Authorization: await getToken() },
            });

            if (res && res.data) {
                set({ appliedJob: res.data })
                return true
            }
        } catch (error) {
            console.log("🍿🍿", JSON.stringify(error, null, 5))
            return false
        }
    }
}));

export default useJobStore;