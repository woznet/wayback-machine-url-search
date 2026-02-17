export function isUrl(str) {
  if (!str) return false;
  
  // Check if it has a protocol (e.g., http://, ftp://, mailto:, etc.)
  const protocolMatch = str.match(/^([a-z][a-z0-9+.-]*):\/?\/?/i);
  
  if (protocolMatch) {
    // It has an explicit protocol
    const protocol = protocolMatch[1].toLowerCase();
    if (protocol !== 'http' && protocol !== 'https') {
      return false; // Only allow http and https
    }
    // For http/https, try to parse as-is
    try {
      const url = new URL(str);
      const hostname = url.hostname;
      // Hostname must not be empty or just a dot
      if (!hostname || hostname === '.') {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }
  
  // No protocol: check the input itself first for obviously invalid patterns
  // Reject pure numeric strings (they get interpreted as IPv4 addresses)
  if (/^\d+$/.test(str)) {
    return false;
  }
  
  // Prepend https:// and validate
  const urlStr = `https://${str}`;
  
  try {
    const url = new URL(urlStr);
    const hostname = url.hostname;
    
    // Hostname must be valid
    if (!hostname || hostname === '.') {
      return false;
    }
    
    // Must have at least one dot (like example.com) or be localhost
    return hostname.includes('.') || hostname === 'localhost';
  } catch {
    return false;
  }
}
