declare module 'react-infinite-scroller' {
  import { ReactNode } from 'react';

  interface InfiniteScrollProps {
    pageStart?: number;
    loadMore: () => void;
    hasMore: boolean;
    loader?: ReactNode;
    useWindow?: boolean;
    children?: ReactNode;
    threshold?: number;
  }

  const InfiniteScroll: React.FC<InfiniteScrollProps>;
  export default InfiniteScroll;
}
