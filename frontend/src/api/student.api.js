import api from './axios';

export const studentApi = {
  /**
   * Fetch paginated/filtered student list.
   * The axios interceptor already unwraps response.data,
   * so the resolved value IS the JSON body ({ data, pagination }).
   */
  getStudents: async (params = {}) => {
    // Strip empty/null/undefined values to keep URLs clean
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, val]) => val !== undefined && val !== null && val !== ''
      )
    );
    return api.get('/v1/students', { params: cleanParams });
  },
};
