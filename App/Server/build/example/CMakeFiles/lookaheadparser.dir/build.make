# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.27

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/local/Cellar/cmake/3.27.6/bin/cmake

# The command to remove a file.
RM = /usr/local/Cellar/cmake/3.27.6/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /Users/brian/Work/C++/App/Server/rapidjson-master

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /Users/brian/Work/C++/App/Server/build

# Include any dependencies generated for this target.
include example/CMakeFiles/lookaheadparser.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include example/CMakeFiles/lookaheadparser.dir/compiler_depend.make

# Include the progress variables for this target.
include example/CMakeFiles/lookaheadparser.dir/progress.make

# Include the compile flags for this target's objects.
include example/CMakeFiles/lookaheadparser.dir/flags.make

example/CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.o: example/CMakeFiles/lookaheadparser.dir/flags.make
example/CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.o: /Users/brian/Work/C++/App/Server/rapidjson-master/example/lookaheadparser/lookaheadparser.cpp
example/CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.o: example/CMakeFiles/lookaheadparser.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/brian/Work/C++/App/Server/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object example/CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.o"
	cd /Users/brian/Work/C++/App/Server/build/example && /usr/bin/clang++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT example/CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.o -MF CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.o.d -o CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.o -c /Users/brian/Work/C++/App/Server/rapidjson-master/example/lookaheadparser/lookaheadparser.cpp

example/CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.i"
	cd /Users/brian/Work/C++/App/Server/build/example && /usr/bin/clang++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/brian/Work/C++/App/Server/rapidjson-master/example/lookaheadparser/lookaheadparser.cpp > CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.i

example/CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.s"
	cd /Users/brian/Work/C++/App/Server/build/example && /usr/bin/clang++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/brian/Work/C++/App/Server/rapidjson-master/example/lookaheadparser/lookaheadparser.cpp -o CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.s

# Object files for target lookaheadparser
lookaheadparser_OBJECTS = \
"CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.o"

# External object files for target lookaheadparser
lookaheadparser_EXTERNAL_OBJECTS =

bin/lookaheadparser: example/CMakeFiles/lookaheadparser.dir/lookaheadparser/lookaheadparser.cpp.o
bin/lookaheadparser: example/CMakeFiles/lookaheadparser.dir/build.make
bin/lookaheadparser: example/CMakeFiles/lookaheadparser.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --bold --progress-dir=/Users/brian/Work/C++/App/Server/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable ../bin/lookaheadparser"
	cd /Users/brian/Work/C++/App/Server/build/example && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/lookaheadparser.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
example/CMakeFiles/lookaheadparser.dir/build: bin/lookaheadparser
.PHONY : example/CMakeFiles/lookaheadparser.dir/build

example/CMakeFiles/lookaheadparser.dir/clean:
	cd /Users/brian/Work/C++/App/Server/build/example && $(CMAKE_COMMAND) -P CMakeFiles/lookaheadparser.dir/cmake_clean.cmake
.PHONY : example/CMakeFiles/lookaheadparser.dir/clean

example/CMakeFiles/lookaheadparser.dir/depend:
	cd /Users/brian/Work/C++/App/Server/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/brian/Work/C++/App/Server/rapidjson-master /Users/brian/Work/C++/App/Server/rapidjson-master/example /Users/brian/Work/C++/App/Server/build /Users/brian/Work/C++/App/Server/build/example /Users/brian/Work/C++/App/Server/build/example/CMakeFiles/lookaheadparser.dir/DependInfo.cmake "--color=$(COLOR)"
.PHONY : example/CMakeFiles/lookaheadparser.dir/depend

