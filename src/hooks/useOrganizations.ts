import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getSafeErrorMessage } from '@/lib/errorUtils';
import type { Database } from '@/integrations/supabase/types';

type Organization = Database['public']['Tables']['organizations']['Row'];
type OrganizationInsert = Database['public']['Tables']['organizations']['Insert'];
type OrganizationType = Database['public']['Enums']['organization_type'];

export const useOrganizations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: organizations = [], isLoading, error } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Organization[];
    },
  });

  const createOrganization = useMutation({
    mutationFn: async (organization: Omit<OrganizationInsert, 'id' | 'created_at' | 'updated_at'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Must be logged in to create an organization');

      const { data, error } = await supabase
        .from('organizations')
        .insert({ ...organization, created_by: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      toast({
        title: 'Organization Added',
        description: 'The organization has been added to the directory.',
      });
    },
    onError: (error: unknown) => {
      toast({
        title: 'Error',
        description: getSafeErrorMessage(error, 'create'),
        variant: 'destructive',
      });
    },
  });

  const updateOrganization = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Organization> & { id: string }) => {
      const { data, error } = await supabase
        .from('organizations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      toast({
        title: 'Organization Updated',
        description: 'The organization has been updated.',
      });
    },
    onError: (error: unknown) => {
      toast({
        title: 'Error',
        description: getSafeErrorMessage(error, 'update'),
        variant: 'destructive',
      });
    },
  });

  const deleteOrganization = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('organizations')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      toast({
        title: 'Organization Removed',
        description: 'The organization has been removed from the directory.',
      });
    },
    onError: (error: unknown) => {
      toast({
        title: 'Error',
        description: getSafeErrorMessage(error, 'delete'),
        variant: 'destructive',
      });
    },
  });

  return {
    organizations,
    isLoading,
    error,
    createOrganization,
    updateOrganization,
    deleteOrganization,
  };
};

export type { Organization, OrganizationInsert, OrganizationType };
