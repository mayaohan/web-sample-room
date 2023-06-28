import Mock from 'mockjs';
import name from './name.json';
import route from './route.json'
import role from './role.json'

export const mockStart = () => {
  Mock.mock('/api/getName', {
    code: 200,
    data: {
      'userName|1': name,
    },
  });
  Mock.mock('/api/getRoute', {
    code: 200,
    data: {
      'route': route,
      'role':role
    },
  });
};
