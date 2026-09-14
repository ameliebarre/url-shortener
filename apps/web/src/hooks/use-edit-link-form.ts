import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchUrlById, updateUrl } from '../lib/api/urls';
import { ApiError } from '../lib/api-client';

export function useEditLinkForm(idLink: string | undefined) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const linkQuery = useQuery({
    queryKey: ['urls', idLink],
    queryFn: () => fetchUrlById(idLink!),
    enabled: Boolean(idLink),
    retry: false,
  });

  const link = linkQuery.data;
  const queryError =
    linkQuery.error instanceof ApiError ? linkQuery.error : undefined;
  const notFound = queryError?.status === 404;

  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [initializedForId, setInitializedForId] = useState<string>();

  if (link && initializedForId !== idLink) {
    setUrl(link.targetUrl);
    setCode(link.shortcode);
    setExpiresAt(link.expiresAt ? link.expiresAt.slice(0, 16) : '');
    setInitializedForId(idLink);
  }

  const mutation = useMutation({
    mutationFn: () =>
      updateUrl(idLink!, {
        url,
        code,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] });
      navigate('/dashboard/links');
    },
  });

  const error =
    mutation.error instanceof ApiError ? mutation.error : undefined;

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate();
  }

  return {
    url,
    setUrl,
    code,
    setCode,
    expiresAt,
    setExpiresAt,
    link,
    isLoading: linkQuery.isPending,
    isError: linkQuery.isError,
    notFound,
    isPending: mutation.isPending,
    error,
    handleSubmit,
  };
}
