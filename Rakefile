# Deploy
task :default => :run
 
desc 'Push site to server'
task :push do
	print "Push _site to OpenShift..\n"
  # sh "rsync -az --delete _site/ ayanami:~/app-root/repo/php"
  sh "rsync -az --delete _site/ eva:/home/web/www/anton-shuvalov.info"
	print "Done...\n"
end

#run
desc 'Run server'
task :run do
	print "Starting jekyll...\n"
  sh "jekyll --server"
end