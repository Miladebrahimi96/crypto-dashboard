import React from 'react';
import { List, Spin } from 'antd';
import { useTranslation } from '@/core/i18n/useTranslation';
import { useInfiniteScroll } from '@/core/hooks';

export type CustomListProps = {
  data: any[];
  height?: number;
  itemKey: string;
  onScroll: () => void;
  hasMore: boolean;
  children: (item: any) => React.ReactElement;
  loading?: boolean;
  grid?: any;
  threshold?: number;
};

const CustomList = ({
  data,
  itemKey,
  onScroll,
  hasMore,
  children,
  grid,
  loading = false,
  threshold = 200
}: CustomListProps) => {
  const { t } = useTranslation();
  const { lastElementRef } = useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: onScroll,
    threshold
  });

  return (
    <div className="w-full overflow-y-auto p-4 h-100%">
      <List
        grid={grid}
        dataSource={data}
        renderItem={(item: any, index: number) => (
          <List.Item
            key={item[itemKey]}
            ref={index === data.length - 1 ? lastElementRef : null}
          >
            {children(item)}
          </List.Item>
        )}
      />
      {loading && hasMore && (
        <div className="text-center py-4">
          <Spin />
          <div className="mt-2 text-gray-500">{t('common.loading_more')}</div>
        </div>
      )}
    </div>
  );
};

export default CustomList;