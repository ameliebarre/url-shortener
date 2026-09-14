import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { deleteUrl, type ShortUrl } from '../lib/api/urls';
import { API_BASE_URL } from '../lib/api-client';

export function useLinkCard(link: ShortUrl) {
  const shortUrl = `${API_BASE_URL}/${link.shortcode}`;
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteUrl(link.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] });
    },
  });

  async function handleCopy() {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDelete() {
    if (window.confirm('Delete this link?')) {
      deleteMutation.mutate();
    }
  }

  return {
    shortUrl,
    copied,
    handleCopy,
    handleDelete,
    isDeleting: deleteMutation.isPending,
  };
}
