# Deploy
task :default => :run
 
desc 'Push site to OpenShift'
task :push do
	print "Push _site to OpenShift..\n"
  sh "rsync -az --delete _site/ ayanami:~/app-root/repo/php"
	print "Done...\n"
end

#run
desc 'Run server'
task :run do
	print "Starting jekyll...\n"
  sh "jekyll --server --auto"
end