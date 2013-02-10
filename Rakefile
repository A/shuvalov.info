require 'rubygems'
require 'aws/s3'

# Default task
task :default => :run


# TODO: Перевести парсер jekyll --rdiscount



# Deploy 
desc 'Push site to server'
task :push => :build do
	print "> Push _site to server..\n"
  # sh "rsync -az --delete _site/ eva:/home/web/www/anton-shuvalov.info"
  sh "rsync -az --delete _site/ ayanami:/home/toji/domains/anton-shuvalov.info"
	print "Done...\n"
end




# Deploy to S3
desc 'Push site to S3'
task :push_amazon => :build do
  print "> Push _site to S3..\n"
  # Establish connection
  AWS::S3::Base.establish_connection!(
    :access_key_id     => 'AKIAIJ4TRRAUQSXWGHLQ',
    :secret_access_key => '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'
  )
  upload('_site')
	print "> Done...\n"
end




# Just generate site
desc 'Build site for pushing to server'
task :build do
  print "> generate site\n"
  sh "jekyll --no-server --no-auto --url http://anton-shuvalov.info"
  print "> Done...\n"
end




# Run
desc 'Run server'
task :run do
	print "> Starting jekyll...\n"
  sh "jekyll --server --kramdown"
end




def upload(dir)
  Dir.foreach(dir) do |f|
    next if f == '.' or f == '..'
    f = dir + '/' + f
    if File.directory? f
      upload(File.expand_path f) { |x| puts x }
    else
      begin
        file =  f.split('_site/')[1]
        puts "> upload '_site/#{file}'\n"
        AWS::S3::S3Object.store(file, open("_site/#{file}"), "anton-shuvalov.info")
        object = AWS::S3::S3Object.find(file, "anton-shuvalov.info")
        object.acl.grants << AWS::S3::ACL::Grant.grant(:public_read)
        object.acl(object.acl)
      rescue Exception=>e
        puts e
      end
    end
  end
end