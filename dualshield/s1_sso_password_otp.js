/*
Scenario: SAML SSO, username + password
*/
// Creator: WebInspector 537.36

import { sleep, group } from "k6";
import http from "k6/http";

export const options = {};

export default function () {
  let response;

  group(
    "page_4 - https://dualshield6.deepnetsecurity.com/dac/saml/acs",
    function () {
      response = http.post(
        "https://dualshield6.deepnetsecurity.com/dac/saml/acs",
        {
          RelayState:
            "aHR0cHM6Ly9kdWFsc2hpZWxkNi5kZWVwbmV0c2VjdXJpdHkuY29tL2RhYy9hcHA%2FZXA9JTJG",
          SAMLResponse:
            "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHNhbWwycDpSZXNwb25zZSBEZXN0aW5hdGlvbj0iaHR0cHM6Ly9kdWFsc2hpZWxkNi5kZWVwbmV0c2VjdXJpdHkuY29tL2RhYy9zYW1sL2FjcyIgSUQ9Il85MjU2ZTU4ZjkzYTFjYzk1M2E5MDNhMDc2OWEzMGM0ZiIgSW5SZXNwb25zZVRvPSJfMjA4NzhkNjA2NTE1NjQ0MWY1ODViMjAwM2U4ZGIyNjI4NjZkMzY0ZCIgSXNzdWVJbnN0YW50PSIyMDIwLTA3LTE2VDA4OjQxOjMwLjE0N1oiIFZlcnNpb249IjIuMCIgeG1sbnM6c2FtbDJwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiPjxzYW1sMjpJc3N1ZXIgeG1sbnM6c2FtbDI9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPnVybjpkZWVwbmV0OmR1YWw6aWRwOnNzbzY6ZHVhbHNoaWVsZDYuZGVlcG5ldHNlY3VyaXR5LmNvbTwvc2FtbDI6SXNzdWVyPjxzYW1sMnA6U3RhdHVzPjxzYW1sMnA6U3RhdHVzQ29kZSBWYWx1ZT0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnN0YXR1czpTdWNjZXNzIi8%2BPC9zYW1sMnA6U3RhdHVzPjxzYW1sMjpBc3NlcnRpb24gSUQ9Il9iMzQ5NDY3ZjVlMDkzMDU3ZDkxNWNkNmI3MGZiYjc0ZSIgSXNzdWVJbnN0YW50PSIyMDIwLTA3LTE2VDA4OjQxOjMwLjE0N1oiIFZlcnNpb249IjIuMCIgeG1sbnM6c2FtbDI9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iIHhtbG5zOnhzZD0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiPjxzYW1sMjpJc3N1ZXI%2BdXJuOmRlZXBuZXQ6ZHVhbDppZHA6c3NvNjpkdWFsc2hpZWxkNi5kZWVwbmV0c2VjdXJpdHkuY29tPC9zYW1sMjpJc3N1ZXI%2BPGRzOlNpZ25hdHVyZSB4bWxuczpkcz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnIyI%2BCjxkczpTaWduZWRJbmZvPgo8ZHM6Q2Fub25pY2FsaXphdGlvbk1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPgo8ZHM6U2lnbmF0dXJlTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8wNC94bWxkc2lnLW1vcmUjcnNhLXNoYTI1NiIvPgo8ZHM6UmVmZXJlbmNlIFVSST0iI19iMzQ5NDY3ZjVlMDkzMDU3ZDkxNWNkNmI3MGZiYjc0ZSI%2BCjxkczpUcmFuc2Zvcm1zPgo8ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1cmUiLz4KPGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyI%2BPGVjOkluY2x1c2l2ZU5hbWVzcGFjZXMgUHJlZml4TGlzdD0ieHNkIiB4bWxuczplYz0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8%2BPC9kczpUcmFuc2Zvcm0%2BCjwvZHM6VHJhbnNmb3Jtcz4KPGRzOkRpZ2VzdE1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMDQveG1sZW5jI3NoYTI1NiIvPgo8ZHM6RGlnZXN0VmFsdWU%2BYjBiRXQzWGJtQmRrejVmbEhuYVA5RzE1K0xWL1BhV1l3SjJndmU3ZmJaVT08L2RzOkRpZ2VzdFZhbHVlPgo8L2RzOlJlZmVyZW5jZT4KPC9kczpTaWduZWRJbmZvPgo8ZHM6U2lnbmF0dXJlVmFsdWU%2BClFNL0JDTTFMZ3h3YjM0Q0NuRnE2QlV2eDVUemRPNE4xOUNzVTNSWS8zRXcwZTE1MHkvOXFweEpaN0pqVldSNzE1NVJjcDBBUm5ySkMKZk9odXZzU0ZGOWI2UlBLOSs0eUNBMEs2SXMwWHduN2ZJaWxHbTNmVWRLTE1OaDZlOTFWaWgrcW1PeUVMS1lXaFU1NTZXcEQxUGFWUQozdG1idlZwbE9MUUZMQWNBdW5nPQo8L2RzOlNpZ25hdHVyZVZhbHVlPgo8ZHM6S2V5SW5mbz48ZHM6WDUwOURhdGE%2BPGRzOlg1MDlDZXJ0aWZpY2F0ZT5NSUlDUWpDQ0Fhc0NCZ0V3a29mSlpqQU5CZ2txaGtpRzl3MEJBUVVGQURCbk1Rc3dDUVlEVlFRR0V3SlZTekVaTUJjR0ExVUVDZ3dRClJHVmxjRzVsZENCVFpXTjFjbWwwZVRFYk1Ca0dBMVVFQ3d3U1JHVmxjRzVsZENCRWRXRnNVMmhwWld4a01TQXdIZ1lEVlFRRERCZHAKWkhBdVpHVmxjRzVsZEhObFkzVnlhWFI1TG1OdmJUQWVGdzB4TVRBMU1UWXdPVEF3TXpCYUZ3MHlNVEEwTWpNd09UQXdNekJhTUdjeApDekFKQmdOVkJBWVRBbFZMTVJrd0Z3WURWUVFLREJCRVpXVndibVYwSUZObFkzVnlhWFI1TVJzd0dRWURWUVFMREJKRVpXVndibVYwCklFUjFZV3hUYUdsbGJHUXhJREFlQmdOVkJBTU1GMmxrY0M1a1pXVndibVYwYzJWamRYSnBkSGt1WTI5dE1JR2ZNQTBHQ1NxR1NJYjMKRFFFQkFRVUFBNEdOQURDQmlRS0JnUUNSUE9ZM3BDUkcyNE5FNG5RejFuaUVmc0hOWjZieUMreGZ3azk4TnpPU1JnejdIVGpnVmZJeApRMXEwVzc5aXViU3BaOEpMaTVQSDhtRWZrRzZUazNWOVl0N3QzNDhyaVVvTXNlNDVjN0tZWVZhZ1FvUm1tNzZGaFhaeUVrYnh2V3U2CjlnNFQ0a0dwQW1mZTQxdVUzY0FXalFKdEpUOGdrOWMreVJpN1drY1RpUUlEQVFBQk1BMEdDU3FHU0liM0RRRUJCUVVBQTRHQkFISDgKckdRNityMVd1UHZzbm9zV3pETWJiR2dNVmRSQzJDOHV2cHVZUzZxb2tXclFYbjZsaHdXNWk0ZFRkMHU0RTFzOVh6a0N1NXg2MXRaUgpHbC9CL1lTTk1FY3hjWEZZVlIzU3JLN2VzUWNEVnRjRDRpb1hwcm1BTERPVlBsVUEwTDMzTFpXL3BhYTZHUEJ6SHAzSTZGdHhMN0x0CjJra2JjVC9zVWZmR0tVbW88L2RzOlg1MDlDZXJ0aWZpY2F0ZT48L2RzOlg1MDlEYXRhPjwvZHM6S2V5SW5mbz48L2RzOlNpZ25hdHVyZT48c2FtbDI6U3ViamVjdD48c2FtbDI6TmFtZUlEIEZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6MS4xOm5hbWVpZC1mb3JtYXQ6ZW1haWxBZGRyZXNzIiBOYW1lUXVhbGlmaWVyPSJ1cm46ZGVlcG5ldDpkdWFsOmlkcDpzc282OmR1YWxzaGllbGQ2LmRlZXBuZXRzZWN1cml0eS5jb20iPnNhPC9zYW1sMjpOYW1lSUQ%2BPHNhbWwyOlN1YmplY3RDb25maXJtYXRpb24gTWV0aG9kPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6Y206YmVhcmVyIj48c2FtbDI6U3ViamVjdENvbmZpcm1hdGlvbkRhdGEgSW5SZXNwb25zZVRvPSJfMjA4NzhkNjA2NTE1NjQ0MWY1ODViMjAwM2U4ZGIyNjI4NjZkMzY0ZCIgTm90T25PckFmdGVyPSIyMDIwLTA3LTE2VDA4OjQ2OjMwLjE0OFoiIFJlY2lwaWVudD0iaHR0cHM6Ly9kdWFsc2hpZWxkNi5kZWVwbmV0c2VjdXJpdHkuY29tL2RhYy9zYW1sL2FjcyIvPjwvc2FtbDI6U3ViamVjdENvbmZpcm1hdGlvbj48L3NhbWwyOlN1YmplY3Q%2BPHNhbWwyOkNvbmRpdGlvbnMgTm90QmVmb3JlPSIyMDIwLTA3LTE2VDA4OjMxOjMwLjE0N1oiIE5vdE9uT3JBZnRlcj0iMjAyMC0wNy0xNlQwODo0NjozMC4xNDdaIj48c2FtbDI6QXVkaWVuY2VSZXN0cmljdGlvbj48c2FtbDI6QXVkaWVuY2U%2BdXJuOmRlZXBuZXQ6ZHVhbDpzcDpkYWM6ZHVhbHNoaWVsZDYuZGVlcG5ldHNlY3VyaXR5LmNvbTwvc2FtbDI6QXVkaWVuY2U%2BPC9zYW1sMjpBdWRpZW5jZVJlc3RyaWN0aW9uPjwvc2FtbDI6Q29uZGl0aW9ucz48c2FtbDI6QXV0aG5TdGF0ZW1lbnQgQXV0aG5JbnN0YW50PSIyMDIwLTA3LTE2VDA4OjQxOjMwLjAzMloiIFNlc3Npb25JbmRleD0iZDdiMGM4NjgtYTU5MC00MzA1LWEwN2MtYzk0YTY3OGRlN2EyIiBTZXNzaW9uTm90T25PckFmdGVyPSIyMDIwLTA3LTE2VDIwOjQxOjMwLjE0OFoiPjxzYW1sMjpBdXRobkNvbnRleHQ%2BPHNhbWwyOkF1dGhuQ29udGV4dENsYXNzUmVmPnVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphYzpjbGFzc2VzOlBhc3N3b3JkPC9zYW1sMjpBdXRobkNvbnRleHRDbGFzc1JlZj48L3NhbWwyOkF1dGhuQ29udGV4dD48L3NhbWwyOkF1dGhuU3RhdGVtZW50PjxzYW1sMjpBdHRyaWJ1dGVTdGF0ZW1lbnQ%2BPHNhbWwyOkF0dHJpYnV0ZSBOYW1lPSJzZXNzaW9uVGltZW91dEFicyIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sMjpBdHRyaWJ1dGVWYWx1ZSB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiB4c2k6dHlwZT0ieHNkOnN0cmluZyI%2BMTU5NDkzMjA5MDAzMjwvc2FtbDI6QXR0cmlidXRlVmFsdWU%2BPC9zYW1sMjpBdHRyaWJ1dGU%2BPHNhbWwyOkF0dHJpYnV0ZSBOYW1lPSJsYXN0TG9naW4iIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6dXJpIj48c2FtbDI6QXR0cmlidXRlVmFsdWUgeG1sbnM6eHNpPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeHNpOnR5cGU9InhzZDpzdHJpbmciPjIwMjAtMDctMTZUMDg6NDE6MjlaPC9zYW1sMjpBdHRyaWJ1dGVWYWx1ZT48L3NhbWwyOkF0dHJpYnV0ZT48c2FtbDI6QXR0cmlidXRlIE5hbWU9IlRpY2tldCIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sMjpBdHRyaWJ1dGVWYWx1ZSB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiB4c2k6dHlwZT0ieHNkOnN0cmluZyI%2BMTRkNWNjNGUtMGJkYi00NDk3LTgyZjYtMmJkYmIzMmE5NTMzOjhlYzBhNDFhNDU3MzQ2YzFiOTgwMGRjY2FmMTMyMTM4PC9zYW1sMjpBdHRyaWJ1dGVWYWx1ZT48L3NhbWwyOkF0dHJpYnV0ZT48c2FtbDI6QXR0cmlidXRlIE5hbWU9Im5ldGJpb3NOYW1lIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OnVyaSI%2BPHNhbWwyOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhzaTp0eXBlPSJ4c2Q6c3RyaW5nIj5NYW5hZ2VtZW50IENvbnNvbGU8L3NhbWwyOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDI6QXR0cmlidXRlPjxzYW1sMjpBdHRyaWJ1dGUgTmFtZT0icHJvZmlsZUlkIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OnVyaSI%2BPHNhbWwyOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhzaTp0eXBlPSJ4c2Q6c3RyaW5nIj4xNTIzODk1MDI2NTgwODM8L3NhbWwyOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDI6QXR0cmlidXRlPjxzYW1sMjpBdHRyaWJ1dGUgTmFtZT0ibG9naW5OYW1lIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OnVyaSI%2BPHNhbWwyOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhzaTp0eXBlPSJ4c2Q6c3RyaW5nIj5zYTwvc2FtbDI6QXR0cmlidXRlVmFsdWU%2BPC9zYW1sMjpBdHRyaWJ1dGU%2BPHNhbWwyOkF0dHJpYnV0ZSBOYW1lPSJmdWxsTmFtZSIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sMjpBdHRyaWJ1dGVWYWx1ZSB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiB4c2k6dHlwZT0ieHNkOnN0cmluZyI%2BU3lzdGVtIEFkbWluaXN0cmF0b3I8L3NhbWwyOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDI6QXR0cmlidXRlPjxzYW1sMjpBdHRyaWJ1dGUgTmFtZT0iZG5zTmFtZSIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sMjpBdHRyaWJ1dGVWYWx1ZSB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiB4c2k6dHlwZT0ieHNkOnN0cmluZyI%2BbWFuYWdlbWVudC5jb25zb2xlPC9zYW1sMjpBdHRyaWJ1dGVWYWx1ZT48L3NhbWwyOkF0dHJpYnV0ZT48c2FtbDI6QXR0cmlidXRlIE5hbWU9InNlc3Npb25JZGxlVGltZSIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sMjpBdHRyaWJ1dGVWYWx1ZSB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiB4c2k6dHlwZT0ieHNkOnN0cmluZyI%2BMzYwMDwvc2FtbDI6QXR0cmlidXRlVmFsdWU%2BPC9zYW1sMjpBdHRyaWJ1dGU%2BPHNhbWwyOkF0dHJpYnV0ZSBOYW1lPSJzZXNzaW9uVGltZW91dCIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDp1cmkiPjxzYW1sMjpBdHRyaWJ1dGVWYWx1ZSB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiB4c2k6dHlwZT0ieHNkOnN0cmluZyI%2BNDMyMDA8L3NhbWwyOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDI6QXR0cmlidXRlPjxzYW1sMjpBdHRyaWJ1dGUgTmFtZT0idXNlcklkIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OnVyaSI%2BPHNhbWwyOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhzaTp0eXBlPSJ4c2Q6c3RyaW5nIj5jYjMxYjI5YmM4ODgyZGYwYjQ2MDk0MWQxMGVmYjZhYzwvc2FtbDI6QXR0cmlidXRlVmFsdWU%2BPC9zYW1sMjpBdHRyaWJ1dGU%2BPC9zYW1sMjpBdHRyaWJ1dGVTdGF0ZW1lbnQ%2BPC9zYW1sMjpBc3NlcnRpb24%2BPC9zYW1sMnA6UmVzcG9uc2U%2B",
        },
        {
          headers: {
            "cache-control": "max-age=0",
            "upgrade-insecure-requests": "1",
            origin: "https://dualshield6.deepnetsecurity.com",
            "content-type": "application/x-www-form-urlencoded",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "navigate",
            "sec-fetch-user": "?1",
            "sec-fetch-dest": "document",
            referer: "https://dualshield6.deepnetsecurity.com/sso/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      response = http.get(
        "https://dualshield6.deepnetsecurity.com/dac/app?ep=%2F&ep=%252F",
        {
          headers: {
            "cache-control": "max-age=0",
            "upgrade-insecure-requests": "1",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "navigate",
            "sec-fetch-user": "?1",
            "sec-fetch-dest": "document",
            referer: "https://dualshield6.deepnetsecurity.com/sso/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );

      response = http.get("https://dualshield6.deepnetsecurity.com/dac/", {
        headers: {
          "cache-control": "max-age=0",
          "upgrade-insecure-requests": "1",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "sec-fetch-site": "same-origin",
          "sec-fetch-mode": "navigate",
          "sec-fetch-user": "?1",
          "sec-fetch-dest": "document",
          referer: "https://dualshield6.deepnetsecurity.com/sso/",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
          cookie:
            "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          "if-none-match": 'W/"4353-1594338604000"',
          "if-modified-since": "Thu, 09 Jul 2020 23:50:04 GMT",
        },
      });

      response = http.get(
        "https://dualshield6.deepnetsecurity.com/dac/api/userinfo",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "content-type": "application/json",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/dac/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );

      response = http.get(
        "https://dualshield6.deepnetsecurity.com/dac/api/userinfo",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "content-type": "application/json",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/dac/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );

      response = http.get(
        "https://dualshield6.deepnetsecurity.com/dac/api/userinfo",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "content-type": "application/json",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/dac",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );

      response = http.post(
        "https://dualshield6.deepnetsecurity.com/dac/api/user/search",
        '{"match":[["id","=","cb31b29bc8882df0b460941d10efb6ac"]],"return":[{"allRoles":[{"elements":["*"]}]}],"locale":"en"}',
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "content-type": "application/json",
            origin: "https://dualshield6.deepnetsecurity.com",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/dac",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
            "Content-Type": "application/json",
          },
        }
      );

      response = http.post(
        "https://dualshield6.deepnetsecurity.com/dac/api/user/get",
        '{"return":["id","loginName","firstName","lastName","email","mobile","twitter","personalEmail","personalMobile","personalTelephone","telephone","userLocale","domainName"],"match":[["id","=","cb31b29bc8882df0b460941d10efb6ac"]],"locale":"en"}',
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "content-type": "application/json",
            origin: "https://dualshield6.deepnetsecurity.com",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/dac",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
            "Content-Type": "application/json",
          },
        }
      );

      response = http.get(
        "https://dualshield6.deepnetsecurity.com/dac/api/system/getInfo",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "content-type": "application/json",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/dac",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );

      response = http.get(
        "https://dualshield6.deepnetsecurity.com/dac/api/hello",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "content-type": "application/json",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/dac",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );

      response = http.post(
        "https://dualshield6.deepnetsecurity.com/dac/api/userConfiguration/search/",
        '{"match":[["name","=","dacOptions"]],"return":["options"],"locale":"en"}',
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "content-type": "application/json",
            origin: "https://dualshield6.deepnetsecurity.com",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/dac",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
            "Content-Type": "application/json",
          },
        }
      );


      response = http.post(
        "https://dualshield6.deepnetsecurity.com/dac/api/licence/queryLicenceStats",
        '{"headers":{"normalizedNames":{},"lazyUpdate":null,"lazyInit":null,"headers":{}},"locale":"en"}',
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "content-type": "application/json",
            origin: "https://dualshield6.deepnetsecurity.com",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/dac",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
            "Content-Type": "application/json",
          },
        }
      );

      response = http.post(
        "https://dualshield6.deepnetsecurity.com/dac/api/system/getBacklogs/",
        '{"locale":"en"}',
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "content-type": "application/json",
            origin: "https://dualshield6.deepnetsecurity.com",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/dac",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
            "Content-Type": "application/json",
          },
        }
      );
    }
  );

  group(
    "page_3 - https://dualshield6.deepnetsecurity.com/sso/login",
    function () {
      response = http.post(
        "https://dualshield6.deepnetsecurity.com/sso/login",
        {
          SAMLRequest:
            "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHNhbWwycDpBdXRoblJlcXVl%0D%0Ac3QgRGVzdGluYXRpb249Imh0dHBzOi8vZHVhbHNoaWVsZDYuZGVlcG5ldHNlY3VyaXR5LmNvbS9z%0D%0Ac28vbG9naW4iIElEPSJfMjA4NzhkNjA2NTE1NjQ0MWY1ODViMjAwM2U4ZGIyNjI4NjZkMzY0ZCIg%0D%0ASXNzdWVJbnN0YW50PSIyMDIwLTA3LTE2VDA4OjQxOjE0LjEyNloiIFZlcnNpb249IjIuMCIgeG1s%0D%0AbnM6c2FtbDJwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiPjxzYW1sMjpJ%0D%0Ac3N1ZXIgeG1sbnM6c2FtbDI9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24i%0D%0APnVybjpkZWVwbmV0OmR1YWw6c3A6ZGFjOmR1YWxzaGllbGQ2LmRlZXBuZXRzZWN1cml0eS5jb208%0D%0AL3NhbWwyOklzc3Vlcj48ZHM6U2lnbmF0dXJlIHhtbG5zOmRzPSJodHRwOi8vd3d3LnczLm9yZy8y%0D%0AMDAwLzA5L3htbGRzaWcjIj48ZHM6U2lnbmVkSW5mbz48ZHM6Q2Fub25pY2FsaXphdGlvbk1ldGhv%0D%0AZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPjxk%0D%0AczpTaWduYXR1cmVNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3ht%0D%0AbGRzaWcjcnNhLXNoYTEiLz48ZHM6UmVmZXJlbmNlIFVSST0iI18yMDg3OGQ2MDY1MTU2NDQxZjU4%0D%0ANWIyMDAzZThkYjI2Mjg2NmQzNjRkIj48ZHM6VHJhbnNmb3Jtcz48ZHM6VHJhbnNmb3JtIEFsZ29y%0D%0AaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1%0D%0AcmUiLz48ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94%0D%0AbWwtZXhjLWMxNG4jIi8%2BPC9kczpUcmFuc2Zvcm1zPjxkczpEaWdlc3RNZXRob2QgQWxnb3JpdGht%0D%0APSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjc2hhMSIvPjxkczpEaWdlc3RWYWx1%0D%0AZT5STk1HZHJvTHloVnJXR0pLSFFIN09TblFTV3c9PC9kczpEaWdlc3RWYWx1ZT48L2RzOlJlZmVy%0D%0AZW5jZT48L2RzOlNpZ25lZEluZm8%2BPGRzOlNpZ25hdHVyZVZhbHVlPmZvL0dXZlgzYVM1SjRWZDQz%0D%0AT0ZxK1Nlc1RyVEg4Vzg4dlQ3dEh1Y2tZU2c5ME55aGV4K2RlODhlNVlnN09NL1M0SDhpZjFBS2FM%0D%0AZDEvNUpXY25xTE51cmZ4MHRsNFhjdUhnK1hJNEcrTng3RFNLbHZmdHRybkxmcXlnZEZmNi81S0Fu%0D%0AeENPbUVpODY0emVKUlpTMmMySTNHcHd4bVFWM1lSVndPWkxJTUFuKytxQjl1eFFTUGpOajVyRy81%0D%0AMnRSTlJjK3VCK0ZxbFlxR00xMGRjbnh6cG8xbFYyOE1LcTE4WCtQdkswMktNMVJqUzN1Q2tiVC95%0D%0AN0FqVnMyRGhsei8vZG1TenVvUSthQlFoNUw5SkQ5Q1FhSXBCZXF2UVhleDQ1dUVPQ2RkcHFjcXhV%0D%0AbHowWkRoOVdQUXBmVTQ1RHZqSHhzSXZRZ1ExWitNR1FLN0dtV0ZCdz09PC9kczpTaWduYXR1cmVW%0D%0AYWx1ZT48ZHM6S2V5SW5mbz48ZHM6WDUwOURhdGE%2BPGRzOlg1MDlDZXJ0aWZpY2F0ZT5NSUlFU3pD%0D%0AQ0F6T2dBd0lCQWdJR0FXdHJQZTNxTUEwR0NTcUdTSWIzRFFFQkN3VUFNSUdETVFzd0NRWURWUVFH%0D%0ARXdKVlN6RVBNQTBHCkExVUVDQk1HVEc5dVpHOXVNUTh3RFFZRFZRUUhFd1pNYjI1a2IyNHhIVEFi%0D%0AQmdOVkJBb1RGRVJsWlhCdVpYUWdVMlZqZFhKcGRIa2cKVEhSa01SNHdIQVlEVlFRTEV4VkRaWEow%0D%0AYVdacFkyRjBaU0JCZFhSb2IzSnBkSGt4RXpBUkJnTlZCQU1UQ2tSbFpYQnVaWFFnUTBFdwpJQmNO%0D%0ATVRrd05qRTRNVFV6T1RBNVdoZ1BNakV4TmpBek1EZ3hNREV3TWpkYU1CSXhFREFPQmdOVkJBTU1C%0D%0AMlIxWVd4a1lXTXdnZ0VpCk1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRQ3ho%0D%0AWGJadG1VVVhGYmI5YWFQUXdLandhcmVvQ3dvOTRLZlltR1UKM2xiSTN6MlB1UXZ1QmppZ2dvY3Rm%0D%0AaU5XU0VpRUkvcUxTRTdhd3l4MVp3ZHFoOXdDWUNPMEJHVzFFVXJ6WGx1UDhVaGI4VnVOYnBGcQpT%0D%0AT3dya3lORENvdnBHWWdLUWxSajVQTGFJZjhYTDR1bmpQSWxNZnh5SEEzY1N3WGU0M0FSSDIwK2xt%0D%0AUFBiMzZsOFU2SGNKN3FVTy9xCjJaVEZLcks1TkFXRjAydFZLQkV6c3lyVll3V3IrSG1xQ1dDRlI1%0D%0Aam1jUnEyVHUyYzJpWTluQ0dLc0MxaWNtZnh5NEMzdW4zVHhRQzEKNTJlTHRtaWVUdzMwUm1aQkkz%0D%0ARTE1a3ovSmJVT3VubDBiTVVxR1JRTXhvZHdlOHZhbTh5R1dwaGpyYUJvYmNUSmxobTAyTGpUUWpZ%0D%0AWApBZ01CQUFHamdnRXhNSUlCTFRBTUJnTlZIUk1CQWY4RUFqQUFNQTRHQTFVZER3RUIvd1FFQXdJ%0D%0ARm9EQWdCZ05WSFNVQkFmOEVGakFVCkJnZ3JCZ0VGQlFjREFnWUlLd1lCQlFVSEF3RXdnYmdHQTFV%0D%0AZEl3U0JzRENCcllBVUcxNVRqYmo4bWNJZVIyd1hNUW5reHdYQ2hCdWgKZ1lta2dZWXdnWU14Q3pB%0D%0ASkJnTlZCQVlUQWxWTE1ROHdEUVlEVlFRSUV3Wk1iMjVrYjI0eER6QU5CZ05WQkFjVEJreHZibVJ2%0D%0AYmpFZApNQnNHQTFVRUNoTVVSR1ZsY0c1bGRDQlRaV04xY21sMGVTQk1kR1F4SGpBY0JnTlZCQXNU%0D%0ARlVObGNuUnBabWxqWVhSbElFRjFkR2h2CmNtbDBlVEVUTUJFR0ExVUVBeE1LUkdWbGNHNWxkQ0JE%0D%0AUVlJSkFOdDJpZXNOeEhKb01CMEdBMVVkRGdRV0JCUWo4S2R6Q2d6eG9KT3MKSWhsay9jdDRaVUEy%0D%0ATkRBUkJnbGdoa2dCaHZoQ0FRRUVCQU1DQk5Bd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFEaUhJ%0D%0ARlpDbndDbgpNa3NXaStyWEZaQkVkcXdpQ05mM2RkcWxrVUhLbkNyc29NTWlWWXZtdjgvamljU3RV%0D%0AZk5CTWhHVldvWUhYeTZBbEI5MFVnVlZ3MEl4CkhJMVBRUXBNSFJiNi9mQWFyaHluSXVxaHhpdmVD%0D%0ATDMwS3FvVTgxc21QWjlpUXQvT0lLV1hqbEMyUkJsbmNRN1FCNnZwS1VnSGMvTkEKcUhZd2dmY3NP%0D%0Aekd3d2J2MzNJYzNzSkhEM2JwQmwzL2dibEF6blBsY0hhT3R3TGptdDFxRHhzZ0daM2lBbjJRZHFK%0D%0ATGpRVU9qOW5VTgpWMXk5bUgrRXl2WWVHd3RJcGhXc2JrYnU0WEFVV2w0YU4rSTBBcVhMaVppQUU5%0D%0AWnlEb3ZZdlB3aWphM3N0cHpDdHVPMTdlRDRpZmVBCjVxeU1kU2tLR1dOZGpRbjlFcmJ1SzIzTC84%0D%0Abz08L2RzOlg1MDlDZXJ0aWZpY2F0ZT48L2RzOlg1MDlEYXRhPjwvZHM6S2V5SW5mbz48L2RzOlNp%0D%0AZ25hdHVyZT48L3NhbWwycDpBdXRoblJlcXVlc3Q%2B",
          RelayState:
            "aHR0cHM6Ly9kdWFsc2hpZWxkNi5kZWVwbmV0c2VjdXJpdHkuY29tL2RhYy9hcHA%2FZXA9JTJG",
          DASAgentID: "b29c58c365f86c8d39c4ad410e189d36",
        },
        {
          headers: {
            "cache-control": "max-age=0",
            "upgrade-insecure-requests": "1",
            origin: "https://dualshield6.deepnetsecurity.com",
            "content-type": "application/x-www-form-urlencoded",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "navigate",
            "sec-fetch-dest": "document",
            referer: "https://dualshield6.deepnetsecurity.com/dac/app?ep=%2F",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=F58FF7D2B18B43356C5ACA2DB378911E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      response = http.get(
        "https://dualshield6.deepnetsecurity.com/sso/?tabid=TabID_f76f898c-0049-43c9-ac14-a1b20114fb50&DASApplicationName=Management+Console&DASApplicationName=Management%2BConsole",
        {
          headers: {
            "cache-control": "max-age=0",
            "upgrade-insecure-requests": "1",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "navigate",
            "sec-fetch-dest": "document",
            referer: "https://dualshield6.deepnetsecurity.com/dac/app?ep=%2F",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=492634A12B9D59C2323CA78470BE5C54; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );


      response = http.get(
        "https://dualshield6.deepnetsecurity.com/sso/v1/authc/getCustomizationConfigs",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer:
              "https://dualshield6.deepnetsecurity.com/sso/?tabid=TabID_f76f898c-0049-43c9-ac14-a1b20114fb50&DASApplicationName=Management+Console",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=492634A12B9D59C2323CA78470BE5C54; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );

      response = http.get(
        "https://dualshield6.deepnetsecurity.com/sso/v1/authc/getApplications?appName=Management+Console&appName=Management%2520Console",
        {
          headers: {
            pragma: "no-cache",
            accept: "application/json, text/plain, */*",
            "x-dual-tab-id": "TabID_f76f898c-0049-43c9-ac14-a1b20114fb50",
            "cache-control": "no-cache",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/sso/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=492634A12B9D59C2323CA78470BE5C54; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );


      response = http.get(
        "https://dualshield6.deepnetsecurity.com/sso/v1/authc/hasIceLogonSteps?appName=Management+Console&appName=Management%2520Console",
        {
          headers: {
            pragma: "no-cache",
            accept: "application/json, text/plain, */*",
            "x-dual-tab-id": "TabID_f76f898c-0049-43c9-ac14-a1b20114fb50",
            "cache-control": "no-cache",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/sso/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=492634A12B9D59C2323CA78470BE5C54; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );


      response = http.get(
        "https://dualshield6.deepnetsecurity.com/sso/v1/authc/domainList?appName=Management+Console&appName=Management%2520Console",
        {
          headers: {
            pragma: "no-cache",
            accept: "application/json, text/plain, */*",
            "x-dual-tab-id": "TabID_f76f898c-0049-43c9-ac14-a1b20114fb50",
            "cache-control": "no-cache",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/sso/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=492634A12B9D59C2323CA78470BE5C54; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );

      response = http.get(
        "https://dualshield6.deepnetsecurity.com/sso/v1/authc/startLogon?domainId=9039714698ebe498a33c5fb6a1c6e519&appName=Management+Console&appName=Management%2520Console",
        {
          headers: {
            pragma: "no-cache",
            accept: "application/json, text/plain, */*",
            "x-dual-tab-id": "TabID_f76f898c-0049-43c9-ac14-a1b20114fb50",
            "cache-control": "no-cache",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/sso/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=492634A12B9D59C2323CA78470BE5C54; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );

      response = http.get(
        "https://dualshield6.deepnetsecurity.com/sso/v1/authc/userLogonProcedure?username=sa&domainId=9039714698ebe498a33c5fb6a1c6e519",
        {
          headers: {
            pragma: "no-cache",
            accept: "application/json, text/plain, */*",
            "x-dual-tab-id": "TabID_f76f898c-0049-43c9-ac14-a1b20114fb50",
            "cache-control": "no-cache",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/sso/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=492634A12B9D59C2323CA78470BE5C54; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );

      response = http.post(
        "https://dualshield6.deepnetsecurity.com/sso/v1/authc/verify?userName=sa",
        '[{"authMethod":"SPASS","otp":"Deep&net1"}]',
        {
          headers: {
            pragma: "no-cache",
            accept: "application/json, text/plain, */*",
            "x-dual-tab-id": "TabID_f76f898c-0049-43c9-ac14-a1b20114fb50",
            "cache-control": "no-cache",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "content-type": "application/json",
            origin: "https://dualshield6.deepnetsecurity.com",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/sso/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=492634A12B9D59C2323CA78470BE5C54; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
            "Content-Type": "application/json",
          },
        }
      );

      response = http.get(
        "https://dualshield6.deepnetsecurity.com/sso/v1/authc/samlAutoSubmit",
        {
          headers: {
            pragma: "no-cache",
            accept: "application/json, text/plain, */*",
            "x-dual-tab-id": "TabID_f76f898c-0049-43c9-ac14-a1b20114fb50",
            "cache-control": "no-cache",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: "https://dualshield6.deepnetsecurity.com/sso/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=492634A12B9D59C2323CA78470BE5C54; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );
    }
  );

  group(
    "page_2 - https://dualshield6.deepnetsecurity.com/dac/app?ep=%2F",
    function () {
      response = http.get(
        "https://dualshield6.deepnetsecurity.com/dac/app?ep=%2F&ep=%252F",
        {
          headers: {
            "upgrade-insecure-requests": "1",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "navigate",
            "sec-fetch-dest": "document",
            referer: "https://dualshield6.deepnetsecurity.com/dac/",
            "accept-encoding": "gzip, deflate, br",
            "accept-language":
              "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
            cookie:
              "JSESSIONID=59A9FC7C830DE6F4BB1F563A2C51B69E; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
          },
        }
      );
    }
  );

  group("page_1 - https://dualshield6.deepnetsecurity.com/dac", function () {
    response = http.get("https://dualshield6.deepnetsecurity.com/dac", {
      headers: {
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-fetch-site": "none",
        "sec-fetch-mode": "navigate",
        "sec-fetch-user": "?1",
        "sec-fetch-dest": "document",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
        cookie:
          "JSESSIONID=49EE8EDF9BF4A4444F3D4FBDCB57DF74; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
      },
    });
    response = http.get("https://dualshield6.deepnetsecurity.com/dac/", {
      headers: {
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "sec-fetch-site": "none",
        "sec-fetch-mode": "navigate",
        "sec-fetch-user": "?1",
        "sec-fetch-dest": "document",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
        cookie:
          "JSESSIONID=49EE8EDF9BF4A4444F3D4FBDCB57DF74; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
      },
    });


    response = http.get(
      "https://dualshield6.deepnetsecurity.com/dac/api/userinfo",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
          "content-type": "application/json",
          "sec-fetch-site": "same-origin",
          "sec-fetch-mode": "cors",
          "sec-fetch-dest": "empty",
          referer: "https://dualshield6.deepnetsecurity.com/dac/",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6",
          cookie:
            "JSESSIONID=49EE8EDF9BF4A4444F3D4FBDCB57DF74; _ga=GA1.2.56999225.1370876930; experimentation_subject_id=IjJhNGMxZTM4LTU2N2ItNDNhYy05Yjc1LThmMzMwOGRkNWRlZSI%3D--0b6d6289ea2fc3e4af8368d58879673d784bcede; GLOWROOT_SESSION_ID=a061bmel7h7v0628ell8d4gfb5",
        },
      }
    );

  });

  sleep(1);
}
