const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  const { longUrl, customCode } = JSON.parse(event.body);

  try {
    new URL(longUrl);
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid URL format!" }),
    };
  }

  let shortCode = customCode || Math.random().toString(36).substring(2, 8);

  const { data: existingCode } = await supabase
    .from("urls")
    .select("short_code")
    .eq("short_code", shortCode)
    .single();

  if (existingCode) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Short code already taken!" }),
    };
  }

  const { data: existingUrl } = await supabase
    .from("urls")
    .select("short_code")
    .eq("long_url", longUrl)
    .single();

  if (existingUrl) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        shortUrl: `${process.env.URL}/${existingUrl.short_code}`,
      }),
    };
  }

  const { data, error } = await supabase
    .from("urls")
    .insert([{ short_code: shortCode, long_url: longUrl, click_count: 0 }]);

  if (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ shortUrl: `${process.env.URL}/${shortCode}` }),
  };
};
