INSERT INTO public.size(size)
SELECT (34 + (generate_series(0, 32)*0.5))::numeric;
