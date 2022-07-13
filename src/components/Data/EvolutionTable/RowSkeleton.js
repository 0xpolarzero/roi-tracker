import Skeleton from 'react-loading-skeleton';

const RowSkeleton = ({ count }) => {
  return (
    <tr className='row-skeleton'>
      <th scope='row'>
        <Skeleton />
      </th>
      <td>
        <div className='row-balance'>
          <Skeleton />
        </div>
      </td>
      <td>
        <div className='row-balance'>
          <Skeleton />
        </div>
      </td>
      <td>
        <Skeleton />
      </td>
      <td>
        <Skeleton />
      </td>
    </tr>
  );
};

export default RowSkeleton;
