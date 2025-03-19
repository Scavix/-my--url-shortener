const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  const shortCode = event.path.split('/').pop();

  const { data, error } = await supabase
    .from('urls')
    .select('long_url, click_count')
    .eq('short_code', shortCode)
    .single();

  if (error || !data) {
    return { statusCode: 404, body: 'URL not found' };
  }

  const { error: updateError } = await supabase
    .from('urls')
    .update({ click_count: data.click_count + 1 })
    .eq('short_code', shortCode);

  if (updateError) {
    return { statusCode: 500, body: JSON.stringify({ error: updateError.message }) };
  }

  return {
    statusCode: 301,
    headers: {
      Location: data.long_url,
    },
  };
};
