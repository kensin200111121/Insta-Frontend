import type { TablePaginationConfig, TableProps } from 'antd';
import { css } from '@emotion/react';
import { Table } from 'antd';
import TableColumn from '../table-column';
import { useEffect, useState } from 'react';
import { MyButton } from '@/components/basic';

interface MyTableProps<T extends object> extends TableProps<T> {
  height?: string;
  ShowAll?: boolean;
  pagable?: boolean;
  total?: number;
  onTableChange?: (pagination: TablePaginationConfig, filters: Record<string, any>, sorter: any) => void;
  onShowAll?: () => void;
}

const MyTable = <T extends object = object>(props: MyTableProps<T>) => {
  const { height, pagination, ShowAll, pagable, dataSource, total, onTableChange, onShowAll, ...rest } = props;

  const styles = css`
    .ant-table-header {
      overflow: ${dataSource?.length ? 'hidden' : 'visible !important'};
      table{
        table-layout: ${dataSource?.length ? 'fixed' : 'auto !important'};
      }
    }

    .ant-table-body {
      table{
        table-layout: auto !important;
      }
    }

    display: flex;
    flex-direction: column;
    overflow-x: auto;

    .ant-table-wrapper,
    .ant-spin-nested-loading,
    .ant-spin-container,
    .ant-table-container {
      height: 100%;
    }
    .ant-spin-container {
      overflow: hidden;
      display: flex;
      flex-direction: column;

      .ant-table {
        flex: 1;
        overflow: hidden;
        border-bottom: 1px solid #eee;

        .ant-table-container {
          overflow: auto;
          display: flex;
          flex-direction: column;
          .ant-table-body {
            overflow: auto !important;
            flex: 1;
            height: calc(100vh - 300px)!important;
            max-height: calc(100vh - 300px)!important;
            table {
              height: 100%;
            }
          }
        }
      }

      .ant-pagination {
        padding: 0 10px;
      }
    }
    
    .btn-active{
      font-weight: 400;
      background-color: #30260B;
      color: white;
  
      &:hover {
        color: white;
      }
    }
  `;

  const defaultPagination : TablePaginationConfig = {
    total: total || dataSource?.length,
    size: 'default',
    showQuickJumper: false,
    showSizeChanger: true,
    pageSizeOptions: ['10', '25', '50', '100', '200'],
    defaultPageSize: 25,
    showTotal: (total: number, range: number[]) : string => `${range[0]}-${range[1]} of ${total} items`,
  };

  const combinedPagination : TablePaginationConfig = typeof pagination === 'object' ? { ...defaultPagination, ...pagination } : {...defaultPagination};

  const [isShowAll, setIsShowAll] = useState(false);
  const [lastCurrent, setLastCurrent] = useState(1);
  const [lastPageSize, setLastPageSize] = useState(25);

  useEffect(() => {
    if(isShowAll){
      onShowAll && onShowAll();
    }else{
      handleChange({current: lastCurrent, pageSize: lastPageSize}, {}, {});
    }
  }, [isShowAll]);


  const handleChange = (pagination: TablePaginationConfig, filters: Record<string, any>, sorter: any) => {
    if(onTableChange){
      onTableChange(pagination, filters, sorter);
    }
    setLastCurrent(pagination.current || 0);
    setLastPageSize(pagination.pageSize || 0);
  };

  return (
    <div style={{ height }} css={styles}>
      <Table<T> {...rest} scroll={{ x: 'max-content', y: '100%' }} onChange={handleChange}
        pagination={isShowAll || !pagable ? false : combinedPagination} dataSource={dataSource}/>
      {/* { ShowAll && 
        <div className='text-right' style={{marginTop: isShowAll ? '10px' : '0px'}}>
          <MyButton className='btn-active' onClick={() => setIsShowAll(!isShowAll)}>
            {isShowAll ? 'ShowPaginated' : 'ShowAll'}
          </MyButton>
        </div>
      } */}
    </div>
  );

};

MyTable.defaultProps = {
  size: 'small',
  height: 'auto',
} as MyTableProps<any>;

MyTable.Column = TableColumn;
MyTable.ColumnGroup = Table.ColumnGroup;

export default MyTable;

