import { useMutation } from '@tanstack/react-query';
import { useState, type SubmitEvent } from 'react';

import { createUrl } from '../lib/api/urls';
import { API_BASE_URL, ApiError } from '../lib/api-client';

export function useShortenForm(onCreated?: () => void) {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [shortLink, setShortLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: createUrl,
    onSuccess: (result) => {
      setShortLink(`${API_BASE_URL}/${result.shortcode}`);
      setUrl('');
      setCode('');
      setExpiresAt('');
      onCreated?.();
    },
  });

  const error = mutation.error instanceof ApiError ? mutation.error : undefined;

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate({
      url,
      code: code.trim() || undefined,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
    });
  }

  async function handleCopy() {
    if (!shortLink) return;
    await navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return {
    url,
    setUrl,
    code,
    setCode,
    expiresAt,
    setExpiresAt,
    shortLink,
    closeResult: () => setShortLink(null),
    copied,
    handleCopy,
    isPending: mutation.isPending,
    error,
    handleSubmit,
  };
}
