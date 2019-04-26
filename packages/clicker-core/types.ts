export interface HostCaller {
  accept(clientId: number): Promise<{ data: number }>;
  click(clientId: number): Promise<{ data: number }>;
  drop(clientId: number): Promise<{ data: string }>;
}
