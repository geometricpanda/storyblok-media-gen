import { useCallback, useEffect, useLayoutEffect } from 'react';

interface UseAutoHeightProps {
  tool: string;
}

export const useAutoHeight = ({ tool }: UseAutoHeightProps) => {
  const doResize = useCallback(
    (height: number) => {
      window.parent.postMessage(
        {
          action: 'tool-changed',
          event: 'heightChange',
          tool,
          height,
        },
        '*'
      );
    },
    [tool]
  );

  useLayoutEffect(() => {
    doResize(document.body.scrollHeight);
  }, [doResize]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      doResize(document.body.scrollHeight);
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [doResize]);
};
